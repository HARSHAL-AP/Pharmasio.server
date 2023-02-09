const mongoose = require("mongoose");

const labtestSchema = mongoose.Schema({
 
  title: String,
  price: Number,
  
});

const LabtestModel = mongoose.model("labtest", labtestSchema);

module.exports = {
    LabtestModel
};
 