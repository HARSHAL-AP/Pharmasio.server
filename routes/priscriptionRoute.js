const express = require("express");
const multer = require("multer");

const { PresctiptionmModel } = require("../models/Priscription.model");
const preisRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

preisRouter.post("/upload", upload.single("file"), async (req, res) => {
  const { buffer, mimetype } = req.file;
  
  const prescriptionImage = new PresctiptionmModel({
    data: buffer,
    contentType: mimetype,
  });
  await prescriptionImage.save((err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error saving prescription image to database' });
    }

    res.status(200).json({ id: result._id });
  });
});

preisRouter.get("/files/:id", async (req, res) => {
  PresctiptionmModel.findById(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving prescription image from database' });
    }

    if (!result) {
      return res.status(404).json({ message: 'Prescription image not found' });
    }

    res.set('Content-Type', result.contentType);
    res.send(result.data);
  });
});

preisRouter.delete("/files/:id", async (req, res) => {
  PresctiptionmModel.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting prescription image from database' });
    }

    if (!result) {
      return res.status(404).json({ message: 'Prescription image not found' });
    }

    res.status(200).json({ message: 'Prescription image deleted' });
  });
});


module.exports={
    preisRouter
}