const mongoose = require("mongoose");

const drugsSchema = mongoose.Schema({
  image: String,
  drug_name: String,
  prescription_required:Boolean,
  price: Number,
  pack_info: String,
  company: String,
  content: String
 
});

const DrugsModel = mongoose.model("drugs", drugsSchema);

module.exports = {
  DrugsModel
};
 