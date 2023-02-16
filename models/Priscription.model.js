const mongoose = require('mongoose');

const preiscriptionSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const PresctiptionmModel = mongoose.model('presctiption', preiscriptionSchema);

module.exports = {
    PresctiptionmModel
};