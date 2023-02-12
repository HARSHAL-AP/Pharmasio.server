const mongoose = require("mongoose");

const farmerProductSchema = mongoose.Schema({
  image: String,
  title: String,
  saleprice: Number,
  category: String,
  price: Number,
  discount: Number,
  subcategory: String,
  rating: Number,
});

const FarmerProductModel = mongoose.model("farmerproducts", farmerProductSchema);

module.exports = {
    FarmerProductModel
};
 