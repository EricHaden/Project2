const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { urlencoded } = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended:true}));

//app.use(upload.array()); 
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./Images/")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now()+".jpg")
  }
})

var upload = multer({storage:storage});
console.log(upload.destination);

app.post('/upload', upload.single('image'), uploadImage);

function uploadImage(req,res){
  // console.log('post stuff');
  // console.log(req.body.image);

  // if (!req.file) {
  //   console.log('No file received');
  //   return res.status(400).send('No file received');
  // }

  // res.send('Image uploaded successfully');
  ////////////////////////////////////////////////////////
  console.log('post stuff');
  console.log(req.body.image);

  // decode the base64 string to a Buffer
  const imageBuffer = Buffer.from(req.body.image, 'base64');

  // generate a unique filename for the image
  const filename = `image-${Date.now()}.jpg`;

  // save the image file to disk
  fs.writeFile(`./Images/${filename}`, imageBuffer, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving image');
    }

    console.log('Image saved successfully');
    res.send('Image uploaded successfully');
  });

}

app.listen(8000, function () {
  console.log('Server started on port 8000 (http://localhost:8000');
});

module.exports = app;

///////////////////////////////

