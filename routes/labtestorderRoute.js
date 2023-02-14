const express = require("express");
const {adminauthonticate}=require("../midlewere/adminauth.middlewere")
const { userauthonticate}=require("../midlewere/authonticate.middleware")
const {  LabtestorderModel } = require("../models/LabtestOrder.model");
const labtestorderRouter = express.Router();

labtestorderRouter.get("/", async (req, res) => {
    try {
        const data = await LabtestorderModel.find();
        res.send(data);
      } catch (err) {
        res.send(`error:${err}`);
      }
});


labtestorderRouter.get("/:order_number", async (req, res) => {
  const id = req.params.order_number;
  try {
    const order = await LabtestorderModel.find({order_number:id});
    res.send(order);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});




labtestorderRouter.post("/create",userauthonticate, async (req, res) => {
  const payload = req.body;
  try {
    const new_order = new LabtestorderModel(payload);
    await new_order.save();
    res.send("New Order created ");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

labtestorderRouter.patch("/update/:order_number",userauthonticate, async (req, res) => {
  const payload = req.body;
  const id = req.params.order_number;

  try {
    await LabtestorderModel.findOneAndUpdate({order_number: id }, payload);
    res.send("Upadated The Order");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

labtestorderRouter.delete("/delet/:order_number",userauthonticate, async (req, res) => {
  const id = req.params.order_number;

  try {
    await LabtestModel.findOneAndDelet({ order_number: id });
    res.send("Deleted The Order");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});


module.exports={
  labtestorderRouter
}