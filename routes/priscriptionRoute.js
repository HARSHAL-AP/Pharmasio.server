const express = require("express");
const multer = require("multer");
const { PresctiptionmModel } = require("../models/Priscription.model");
const preisRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

preisRouter.post("/upload", upload.single("file"), async (req, res) => {
  const file = new PresctiptionmModel({
    name: req.file.originalname,
    data: req.file.buffer,
  });

  await file.save();
  res.send("File uploaded successfully");
});

preisRouter.get("/files/:id", async (req, res) => {
  const file = await PresctiptionmModel.findById(req.params.id);

  if (!file) {
    return res.status(404).send("File not found");
  }

  res.set("Content-Type", file.contentType);
  res.send(file.data);
});

preisRouter.delete("/files/:id", async (req, res) => {
  const file = await PresctiptionmModel.findByIdAndDelete(req.params.id);

  if (!file) {
    return res.status(404).send("File not found");
  }

  res.send("File deleted successfully");
});

preisRouter.get("/files", async (req, res) => {
  const files = await PresctiptionmModel.find();
  res.send(files);
});


module.exports={
    preisRouter
}