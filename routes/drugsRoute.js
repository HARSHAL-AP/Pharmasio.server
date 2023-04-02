const express = require("express");
const { adminauthonticate } = require("../midlewere/adminauth.middlewere");
const { userauthonticate } = require("../midlewere/authonticate.middleware");
const { DrugsModel } = require("../models/Drug.model");
const drugRouter = express.Router();
drugRouter.get("/getall", async (req, res) => {
  let data = await DrugsModel.find();
  res.send(data);
});

drugRouter.get("/:alphabet", async (req, res) => {
  const alphabet = req.params.alphabet;
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;

  try {
    const data = await DrugsModel.find({
      name: { $regex: "^" + alphabet },
    })
      .skip((page - 1) * limit)
      .limit(limit);
    console.log(data.length);
    res.send(data);
  } catch (err) {
    res.send(`error:${err}`);
  }
});
drugRouter.get("/search", async (req, res) => {
  if (req.query.name != undefined) {
    try {
      let searchdata = await DrugsModel.find({
        name: { $regex: "^" + req.query.name },
      });

      res.send(searchdata);
    } catch (err) {
      res.send(`error:${err}`);
    }
  } else {
    try {
      const data = await DrugsModel.find();
      res.send(data);
    } catch (err) {
      res.send(`error:${err}`);
    }
  }
});

drugRouter.get("/byid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const products = await DrugsModel.findById({ _id: id });
    res.send(products);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

drugRouter.post("/create",  async (req, res) => {
  const payload = req.body;
  try {
    const new_products = new DrugsModel(payload);
    await new_products.save();
    res.send("New Product created ");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

drugRouter.patch("/update/:id", adminauthonticate, async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  try {
    await DrugsModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Upadated The Product");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

drugRouter.delete("/remove/:id", adminauthonticate, async (req, res) => {
  const id = req.params.id;

  try {
    await DrugsModel.findByIdAndDelete({ _id: id });
    res.send("Deleted The Product");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

module.exports = {
  drugRouter,
};
