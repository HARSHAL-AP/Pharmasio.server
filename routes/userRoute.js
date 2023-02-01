const express = require("express");
const { UserModel } = require("../models/User.model");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { name, email, pass, gender, address, mobailno, ocupation } = req.body;
  try {
    bycript.hash(pass, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          pass: secure_password,
          gender,
          address,
          mobailno,
          ocupation,
        });
        await user.save();
        res.send({ msg: "Registerd", Succsess: true });
      }
    });
  } catch (error) {
    res.send({ msg: "Error in registring the user", Succsess: false });
    console.log(error);
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  console.log(email, pass);
  try {
    const user = await UserModel.find({ email });
    const hashed_pass = user[0].pass;
    if (user.length > 0) {
      bycript.compare(pass, hashed_pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({ msg: "Login Successfulll", token: token });
        } else {
          res.send({ msg: "Wrong Credentials", Succsess: false });
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

userRoute.delete("/deletuser/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await UserModel.findByIdAndDelete({ _id: id });
    res.send("Deleted The user");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});
userRoute.patch("/updateuser/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await UserModel.findByIdAndUpdate({ _id: id },payload);
    res.send("Updated The user");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

module.exports = {
  userRoute,
};
