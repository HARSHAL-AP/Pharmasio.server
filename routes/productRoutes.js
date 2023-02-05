const express = require("express");

const { ProductModel } = require("../models/Product.model");
const productRouter = express.Router();

productRouter.get("/data", async (req, res) => {
  if (req.query.price === "price_low_to_high") {
    let data = await ProductModel.find().sort({ price: 1 });
    res.send(data);
  } else if (req.query.price === "price_high_to_low") {
    let data = await ProductModel.find().sort({ price: -1 });
    res.send(data);
  } 
  else if (req.query.category) {
    let data = await ProductModel.find({subcategory:
      req.query.category})
    
    res.send(data);
  }
  else if (req.query.category === "covideesential") {
    let data = await ProductModel.find({category:"covideesential"})
    res.send(data);
  }
  
  else if (req.query.popularBy === "popular") {
    const { popularBy } = req.query;
    try {
      let populatby = await ProductModel.find().sort({ rating: -1 });
      res.send(populatby);
    } catch (err) {
      res.send(err);
    }
  } else if (req.query.page) {
    const { page, limit } = req.query;
    if (!page) {
      page = 1;
    }
    const newlimit = Number(limit);
    let size = (page - 1) * limit;
    let paginated = await ProductModel.find({}).limit(newlimit).skip(size);
    res.send(paginated);
  } else {
    try {
      const data = await ProductModel.find();
      res.send(data);
    } catch (err) {
      res.send(`error:${err}`);
    }
  }
});


productRouter.get("/filter", async (req, res) => {
  try {
    if (req.query.price === "below-500") {
      let filter = await ProductModel.find({
        $and: [{ price: { $gt: 0 } }, { price: { $lt: 500 } }],
      });
      res.send(filter);
    } else if (req.query.price === "below-400") {
      let filter = await ProductModel.find({
        $and: [{ price: { $gt: 0 } }, { price: { $lt: 400 } }],
      });
      res.send(filter);
    } else if (req.query.price === "below-300") {
      let filter = await ProductModel.find({
        $and: [{ price: { $gt: 0 } }, { price: { $lt: 300 } }],
      });
      res.send(filter);
    } else if (req.query.price === "above 500") {
      let filter = await ProductModel.find({ price: { $gt: 500 } });
      res.send(filter);
    }
  } catch (err) {
    res.send(`error:${err}`);
  }
});

productRouter.get("/search", async (req, res) => {
  if (req.query.name != undefined) {
    try {
      let searchdata = await ProductModel.find({
        title: { $regex: `${req.query.name}`, $options: "i" },
      });
      res.send(searchdata);
    } catch (err) {
      res.send(`error:${err}`);
    }
  } else {
    try {
      const data = await ProductModel.find();
      res.send(data);
    } catch (err) {
      res.send(`error:${err}`);
    }
  }
});







productRouter.get("/byid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const products = await ProductModel.findById({_id:id});
    res.send(products);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});




productRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_products = new ProductModel(payload);
    await new_products.save();
    res.send("New Product created ");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

productRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  try {
    await ProductModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Upadated The Product");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});

productRouter.delete("/remove/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await ProductModel.findByIdAndDelete({ _id: id });
    res.send("Deleted The Product");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});


module.exports={
  productRouter
}