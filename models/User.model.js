const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  gender: String,
  birthdate: Date,
  address: {
    street_address: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  phone_number: String,
  cartitems: [
    {
      image: String,
      title: String,
      saleprice: Number,
      category: String,
      price: Number,
      discount: Number,
      subcategory: String,
      rating: Number,
      quantity: Number,
    },
  ],
  labtest_items: [
    {
      title: String,
      person_quantity: Number,
      price: Number
    },
  ],
  orders: [
    {
      order_id: String,
      order_number: String,
    },
  ],
  created_at: Date,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
