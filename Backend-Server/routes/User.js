const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
//import required cntrollers and middleware functions
const{
  login,signUp,sendOTP
}=require("../controllers/Authentication");

// Routes for Login, Signup, and Authentication
router.post("/login",login);
router.post("/signup",signUp);
router.post("/sendotp",sendOTP);

// Export the router for use in the main application
module.exports = router