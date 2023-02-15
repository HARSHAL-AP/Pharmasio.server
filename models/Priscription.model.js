const mongoose = require('mongoose');

const preiscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: Buffer, required: true }
});

const PresctiptionmModel = mongoose.model('Presctiption', preiscriptionSchema);

module.exports = {
    PresctiptionmModel
};