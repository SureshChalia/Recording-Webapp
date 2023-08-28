const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    default:undefined,
    
  },
	email: {
		type: String,
		required: true,
		unique: true,
	},
	
});

module.exports = mongoose.model("User", userSchema);
