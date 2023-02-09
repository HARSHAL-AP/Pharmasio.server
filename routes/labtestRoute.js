const express = require("express");

const { LabtestModel } = require("../models/Labtest.model.js");
const labtestRouter = express.Router();

labtestRouter.get("/data", async (req, res) => {
    try {
        const data = await LabtestModel.find();
        res.send(data);
      } catch (err) {
        res.send(`error:${err}`);
      }
});











labtestRouter.get("/byid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const products = await LabtestModel.findById({_id:id});
    res.send(products);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});




labtestRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_products = new LabtestModel(payload);
    await new_products.save();
    res.send("New Product created ");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

labtestRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  try {
    await LabtestModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Upadated The Product");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

labtestRouter.delete("/remove/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await LabtestModel.findByIdAndDelete({ _id: id });
    res.send("Deleted The Product");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});


module.exports={
    labtestRouter
}