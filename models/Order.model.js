const mongoose = require("mongoose");

const productorderSchema = mongoose.Schema({
    
    user_id: String,
    order_number: String,
    total_amount: Number,
    order_date: Date,
    items: [
        {
            product_id: String,
            product_name: String,
            quantity: Number,
            price: Number
        }
    ],
    shipping_address: {
        phone_number: String,
        street_address: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    payment_method: String,
    status:Boolean
  
});

const ProductorderModel = mongoose.model("productorder", productorderSchema);

module.exports = {
    ProductorderModel
};
 