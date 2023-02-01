const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image: String,
    title: String,
    saleprice:Number,
    catagory:String,
    price:Number,
    discount:Number,
    instock:Boolean,
    adminId:String

 
});

const ProductModel=mongoose.model("product",productSchema)

module.exports={
    ProductModel
}