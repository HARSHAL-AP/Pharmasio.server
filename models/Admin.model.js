const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  gender: String,
  isadmin:Boolean,
  mobailno: Number,
 
});

const AdminModel=mongoose.model("admin",adminSchema)

module.exports={
  AdminModel
}