import { toast } from "react-toastify";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const { SENDOTP_API, SIGNUP_API, LOGIN_API} = endpoints;

export function sendOtp(email) {
  return async() => {
    let success = false;
    console.log(email, "email");
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent:true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      success = true;
      toast.success("OTP Sent Successfully");
    } catch(error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    toast.dismiss(toastId);
    return success;
  };
}

export function signUp(
  { firstName, lastName, email, otp },
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        otp,
      });
      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    toast.dismiss(toastId);
  };
}

export function login(email, name, navigate) {
  return async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        name,
      });
      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    toast.dismiss(toastId);
  };
}