const express = require("express");
const {adminauthonticate}=require("../midlewere/adminauth.middlewere")
const { userauthonticate}=require("../midlewere/authonticate.middleware")
const { FarmerProductModel } = require("../models/FarmerPRoduct.model");
const farmRouter = express.Router();

farmRouter.get("/", async (req, res) => {
  
  const page=req.query.page||1
  const limit=req.query.limit||30

    try {
      const data =await FarmerProductModel.find().skip((page-1)*limit).limit(limit)
    console.log(data.length)
      res.send(data);
    } catch (err) {
      res.send(`error:${err}`);
    }
  
});
farmRouter.get("/search", async (req, res) => {
    if (req.query.name != undefined) {
      try {
        let searchdata = await FarmerProductModel.find({
            title: { $regex:"^"+req.query.name},
        });
       
        res.send(searchdata);
      } catch (err) {
        res.send(`error:${err}`);
      }
    }
 
     else {
      try {
        const data = await FarmerProductModel.find();
        res.send(data);
      } catch (err) {
        res.send(`error:${err}`);
      }
    }
  });



  farmRouter.get("/byid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const products = await FarmerProductModel.findById({_id:id});
    res.send(products);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});



farmRouter.post("/create",adminauthonticate, async (req, res) => {
  const payload = req.body;
  try {
    const new_products = new FarmerProductModel(payload);
    await new_products.save();
    res.send("New Product created ");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

farmRouter.patch("/update/:id",adminauthonticate, async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  try {
    await FarmerProductModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Upadated The Product");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

farmRouter.delete("/remove/:id",adminauthonticate, async (req, res) => {
  const id = req.params.id;

  try {
    await FarmerProductModel.findByIdAndDelete({ _id: id });
    res.send("Deleted The Product");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});


module.exports={
    farmRouter
}