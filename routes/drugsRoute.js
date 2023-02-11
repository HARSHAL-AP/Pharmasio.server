const express = require("express");

const { DrugsModel } = require("../models/Drug.model");
const drugRouter = express.Router();

drugRouter.get("/", async (req, res) => {
    try {
        const data = await DrugsModel.find();
        res.send(data);
      } catch (err) {
        res.send(`error:${err}`);
      }
});
drugRouter.get("/search", async (req, res) => {
    if (req.query.name != undefined) {
      try {
        let searchdata = await DrugsModel.find({
            drug_name: { $regex:"^"+req.query.name},
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
    const products = await DrugsModel.findById({_id:id});
    res.send(products);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});



drugRouter.post("/create", async (req, res) => {
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

drugRouter.patch("/update/:id", async (req, res) => {
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

drugRouter.delete("/remove/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await DrugsModel.findByIdAndDelete({ _id: id });
    res.send("Deleted The Product");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});


module.exports={
    drugRouter
}