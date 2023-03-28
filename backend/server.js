const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      console.log("a");
      cb(null, 'Images');
    } catch (err) {
      console.error("Error in destination function:", err);
      cb(err);
    }
  }, 
    filename: (req, file, cb)=> {
      try {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
        console.log("b");
      } catch (err) {
        console.error("Error in filename function:", err);
        cb(err);
      }
    }
})
const upload = multer({storage: storage});

app.get("upload", (req, res) => {
  res.render("upload");
})

app.post("/upload", upload.single("image"), (req,res) => {
 // console.log(req.body)
  res.status(200).json({
        message: 'Image uploaded successfully',      
  })
  console.log("c");
})

fs.readdir('Images', (err, files) => {
  if (err) {
    console.error('Error reading "Images" folder:', err);
  } else {
    console.log('Files in "Images" folder:', files);
  }
});

app.listen(8000, function () {
  console.log('Server started on port 8000 (http://localhost:8000');
});


//app.set("view engine", "ejs")


// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, '/tmp/uploads')
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
// //     cb(null, file.fieldname + '-' + uniqueSuffix)
// //   }
// // })
// // const upload = multer({ storage: storage});
// const upload = multer({ dest: 'uploads/' })
// app.post('/upload', upload.single('image'), function (req, res) {
//   // req.file is the name of your file in the form above, here 'uploaded_file'
//   // req.body will hold the text fields, if there were any 
//   console.log(req.body)
//   const file = req.body;
//   if (!file) {
//     const error = new Error('Please select an image to upload');
//     error.status = 418;
//     return next(error);
//   }
//   res.status(200).json({
//     message: 'Image uploaded successfully',
//     filename: file.filename
//   });
// });

// // Endpoint to handle image uploads
// // app.post('/upload', upload.single('image'), (req, res) => {
// //   const file = req.body;
// //   if (!file) {
// //     const error = new Error('Please select an image to upload');
// //     error.status = 418;
// //     return next(error);
// //   }
// //   res.status(200).json({
// //     message: 'Image uploaded successfully',
// //     filename: file.filename
// //   });

// // });

// Start the server



