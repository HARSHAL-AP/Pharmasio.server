const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: String,
  title: String,
  saleprice: Number,
  catagory: String,
  price: Number,
  discount: Number,
  subcategory: String,
  rating: Number,
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = {
  ProductModel,
};
 