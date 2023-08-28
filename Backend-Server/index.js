const express = require("express");
const app = express();
const database = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/User");

dotenv.config();
const PORT = process.env.PORT || 6000;

database();

app.use(express.json());
app.use(
	cors({
		origin:true,
		credentials:true,
	})
)
//routes
app.use("/api/version1/auth",userRoutes);

// default route
app.get("/",(req,res)=>{
  return res.json({
    success:true,
    message:"Your Server up and Running"
  });
});

app.listen(PORT,()=>{
  console.log(`App is running at Port ${PORT}`);
})