const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//new user registeration controller
exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      otp,
    } = req.body;

    if (
      !firstName || !email || !otp
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      })
    }
    //check user already registered with us or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "You are already registered with us,please login"
      });
    }

    //find recent otp
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        mesage: "OTP not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    const user = User.create({
      firstName,
      lastName,
      email,
    });

    return res.status(200).json({
      success: true,
      message: "User is registered Successfully",
      user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registred ,Please try again!"
    })
  }
}

//login controller
exports.login = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(403).json({
        success: false,
        message: 'Please fill all the details carefully',
      });
    }
    let user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: "User is not registered with us ,Please signup first",
      })
    }

    // Generate JWT token 
    if (email === user.email && name === user.firstName) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      // Saving token to user document in database
      user.token = token;
      return res.status(200).json({
        success: true,
        token,
        message: "User Logged in successfully",
      });
    } else {
      //name do not matched
      return res.status(401).json({
        success: false,
        message: "name is Incorrect,try again",
      });
    }
  } catch (error) {
    console.log(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: "Login Failure,Please try again",
    });
  }
};

//send otp controller
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email })
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }
    //generating otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    console.log("OTP generated", otp);

    //checking whether created otp is unique or not 
    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })
    }
    const otpPayload = { email, otp };
    //creating an entry in db for otp 
    const otpBody = await OTP.create(otpPayload);

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    })
  } catch (error) {
    console.log("Error during creating OTP", error);
    return res.staturs(500).json({
      success: false,
      message: error.message,
    })
  }
}