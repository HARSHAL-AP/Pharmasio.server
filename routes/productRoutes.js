const express = require("express");
const {adminauthonticate}=require("../midlewere/adminauth.middlewere")
const { ProductModel } = require("../models/Product.model");
const productRouter = express.Router();

productRouter.get("/:category", async (req, res) => {
  const category = req.params.category;
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  let data;

  switch (req.query.sort) {
    case "price_low_to_high":
      data = await ProductModel.find({ category: category })
        .sort({ saleprice: 1 })
        .skip((page - 1) * limit)
        .limit(limit);
      break;

    case "price_high_to_low":
      data = await ProductModel.find({ category: category })
        .sort({ saleprice: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      break;

    case "rating":
      data = await ProductModel.find({ category: category })
        .sort({ rating: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      break;

    case "discount":
      data = await ProductModel.find({ category: category })
        .sort({ discount: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      break;

    default:
      if (req.query.price && req.query.price.startsWith("below-")) {
        const price = parseInt(req.query.price.substring(6));
        if (!isNaN(price)) {
          data = await ProductModel.find({
            $and: [{ saleprice: { $gt: 0 } }, { saleprice: { $lt: price }, category: category }],
          })
            .skip((page - 1) * limit)
            .limit(limit);
        }
      } else if (req.query.price === "above-500") {
        data = await ProductModel.find({ saleprice: { $gt: 500 }, category: category })
          .skip((page - 1) * limit)
          .limit(limit);
      } else if (req.query.subcategory) {
        data = await ProductModel.find({ subcategory: req.query.subcategory, category: category })
          .skip((page - 1) * limit)
          .limit(limit);
      } else {
        data = await ProductModel.find({ category: category })
          .skip((page - 1) * limit)
          .limit(limit);
      }
  }

  res.send(data);
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




productRouter.post("/create",adminauthonticate, async (req, res) => {
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

productRouter.patch("/update/:id",adminauthonticate, async (req, res) => {
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

productRouter.delete("/remove/:id",adminauthonticate, async (req, res) => {
  const id = req.params.id;

  try {
    await ProductModel.findByIdAndDelete({ _id: id });
    res.send("Deleted The Product");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});
productRouter.get("/getall", async (req, res) => {
  

  try {
   let data= await ProductModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});


module.exports={
  productRouter
}