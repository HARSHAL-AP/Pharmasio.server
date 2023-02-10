const mongoose = require("mongoose");

const labtestorderSchema = mongoose.Schema({
    
    user_id: String,
    order_number: String,
    total_amount: Number,
    order_date: Date,
    items: [
        {
            test_id: String,
            test_name: String,
            person_quantity: Number,
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

const LabtestorderModel = mongoose.model("labtestorder", labtestorderSchema);

module.exports = {
    LabtestorderModel
};
 