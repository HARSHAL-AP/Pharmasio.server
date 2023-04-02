const express = require("express");
const multer = require("multer");
const compression = require('compression');
const {adminauthonticate}=require("../midlewere/adminauth.middlewere")
const { PresctiptionmModel } = require("../models/Priscription.model");
const preisRouter = express.Router();
preisRouter.use(compression());
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
      return res.status(500).send({ message: 'Error saving prescription image to database' });
    }

    res.status(200).send({ id: result._id });
  });
});

preisRouter.get("/files/:id", async (req, res) => {
  const id = req.params.id;


 let data=await PresctiptionmModel.findOne({_id:id})
 const imageData = data.data
 const base64Data = imageData.toString(`base64`);
 const url = `data:${data.contentType};base64,${base64Data}`;
 res.setHeader('Content-Encoding', 'gzip');
 res.send(url)
});

preisRouter.delete("/files/:id", async (req, res) => {
  PresctiptionmModel.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error deleting prescription image from database' });
    }

    if (!result) {
      return res.status(404).send({ message: 'Prescription image not found' });
    }

    res.status(200).send({ message: 'Prescription image deleted' });
  });
});

preisRouter.get("/getall", async (req, res) => {
  

  try {
   let data= await PresctiptionmModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Smothing went Wrong" });
  }
});
module.exports={
    preisRouter
}