const express = require("express");
const { AdminModel } = require("../models/Admin.model");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {adminauthonticate} =require("../midlewere/adminauth.middlewere")
const adminRoute = express.Router();

adminRoute.get("/adminall",async(req,res)=>{
  

  const data=await AdminModel.find()
  res.send(data)



})

adminRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await AdminModel.find({ email });
    const hashed_pass = user[0].password;
    if (user.length > 0) {
      bycript.compare(password, hashed_pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({ msg: "Login Successfulll", token: token });
        } else {
          res.send({ msg: "Wrong Credentials", Succsess: false,Succsess: true,
        User: {
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            gender: user[0].gender,
            birthdate: user[0].birthdate,
            address: user[0].address,
            
          
          } });
        }
      });
    } else {
      res.send({ msg: "Wrong Credentials", Succsess: false });
    }
  } catch (error) {
    res.send({ msg: "Error in Login", Succsess: false });
    console.log(error);
  }
});


adminRoute.post("/register",adminauthonticate, async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    gender,
    phone_number,
    isAdmin,
    birthdate,
    address,
  } = req.body;
  const admindata=await AdminModel.find({email:email,phone_number:phone_number})
  if(admindata.length===0){
    try {
      bycript.hash(password, 5, async (err, secure_password) => {
        if (err) {
          console.log(err);
        } else {
          const user = new AdminModel({
            first_name,
            last_name,
            email,
            password: secure_password,
            gender,
            phone_number,
            isAdmin,
            birthdate,
            address,
            created_at: new Date(),
          });
          await user.save();
          res.status(201).send({ msg: "Registerd", Succsess: true });
        }
      });
    } catch (error) {
      res.status(500).send({ msg: "Error in registring the user", Succsess: false });
      console.log(error);
    }
  }
  else{
    res.status(400).send({ message: 'Admin already exists' });
  }
  
});


adminRoute.delete("/deletuser/:id",adminauthonticate, async (req, res) => {
  const id = req.params.id;

  try {
    await AdminModel.findByIdAndDelete({ _id: id });
    res.send("Deleted The user");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});
adminRoute.patch("/updateuser/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await AdminModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Updated The user");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});



module.exports = {
  adminRoute,
};
