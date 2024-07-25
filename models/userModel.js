// const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please Enter Your Name"],
//     minLength: [4, "Name cant be less than 4 character"],
//     maxLength: [30, "Name cant be longer than 30 characters"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please Enter email"],
//     unique: true,
//     validate: [validator.isEmail, "Please Enter valid email"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please Enter Your Password"],
//     minLength: [8, "Password should be more than 8 characters"],
//     select: false,
//   },
//   avatar: {
//     public_id: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   },
//   role: {
//     type: String,
//     default: "user",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },

//   resetPasswordToken: String,
//   resetPasswordExpire: Date,
// });

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// //JWT TOKEN

// userSchema.methods.getJWTToken = async function (next) {
//   return await jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRATION_TIME,
//   });
// };

// // COMPARE BCRYPTJS PASSWORD TO USER ENTERED PASSWORD

// userSchema.methods.passwordMatched = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Generate reset password token
// userSchema.methods.getResetPasswordToken = async function () {
//   // Generating token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   //Hashing and addiding resetToken to userSchema
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//   this.resetPasswordExpire = Date.now() + 1000 * 60 * 15;
//   return resetToken;
// };

// module.exports = mongoose.model("User", userSchema);
