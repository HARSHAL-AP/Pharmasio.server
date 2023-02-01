const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  gender: String,
  Address: String,
  mobailno: Number,
  orders: String,
  ocupation:String
});

const UserModel=mongoose.model("user",userSchema)

module.exports={
  UserModel
}