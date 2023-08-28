const mongoose = require("mongoose");
require("dotenv");

const dbConnect = () => {

	mongoose.connect(process.env.MONGODB_URL,{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}).then(() => console.log("DB is connected successfully")).catch((err) => {
			console.log(`DB connection failed`);
			console.error(err.message);
			process.exit(1);
		});
};
module.exports = dbConnect;
