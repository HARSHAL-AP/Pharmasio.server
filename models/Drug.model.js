const mongoose = require("mongoose");

const drugsSchema = mongoose.Schema({
  name:String,
  price:Number, 
  discount:Number, 
  manufacture:String,  
  prescription_require:Boolean,  
  salt_composition:String,  
  storage:String,  
  introduction:String,  
  uses:String,    
  benifits:Array,  
  side_effect:Array, 
  how_to_use:String, 
  how_drug_works:String, 
  safty_majors:Array,
  substitute:Array,
  tips:Array,
  fact:Array, 
  image:String
 
});

const DrugsModel = mongoose.model("drugs", drugsSchema);

module.exports = {
  DrugsModel
};
 
