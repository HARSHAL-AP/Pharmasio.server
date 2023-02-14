const express = require("express");

const {  ProductorderModel } = require("../models/Order.model");
const {adminauthonticate}=require("../midlewere/adminauth.middlewere")
const { userauthonticate}=require("../midlewere/authonticate.middleware")

const productorderRouter = express.Router();

productorderRouter.get("/",adminauthonticate, async (req, res) => {
    try {
        const data = await ProductorderModel.find();
        res.send(data);
      } catch (err) {
        res.send(`error:${err}`);
      }
});


productorderRouter.get("/admin/:order_number",adminauthonticate, async (req, res) => {
  const id = req.params.order_number;
  try {
    const order = await ProductorderModel.findById({order_number:id});
    res.send(order);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});
productorderRouter.get("/user/:order_number",userauthonticate, async (req, res) => {
  const id = req.params.order_number;
  try {
    const order = await ProductorderModel.findById({order_number:id});
    res.send(order);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});



productorderRouter.post("/create",userauthonticate, async (req, res) => {
  const payload = req.body;
  try {
    const new_order = new ProductorderModel(payload);
    await new_order.save();
    res.send("New Order created ");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

productorderRouter.patch("/update/:order_number",adminauthonticate, async (req, res) => {
  const payload = req.body;
  const id = req.params.order_number;

  try {
    await ProductorderModel.findByIdAndUpdate({order_number: id }, payload);
    res.send("Upadated The Order");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

productorderRouter.delete("/delet/:order_number",adminauthonticate, async (req, res) => {
  const id = req.params.order_number;

  try {
    await LabtestModel.findByIdAndDelete({ _id: id });
    res.send("Deleted The Product");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});


module.exports={
    productorderRouter
}