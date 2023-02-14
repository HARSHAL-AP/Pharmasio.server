const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  gender: String,
  birthdate: Date,
  address: {
    street_address: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  phone_number: String,
  isAdmin:Boolean,
  created_at: Date,
});

const AdminModel=mongoose.model("admin",adminSchema)

module.exports={
  AdminModel
}