// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const fs = require('fs');

// const app = express();
// app.use(cors());

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     try {
//       console.log("a");
//       cb(null, 'Images');
//     } catch (err) {
//       console.error("Error in destination function:", err);
//       cb(err);
//     }
//   }, 
//     filename: (req, file, cb)=> {
//       try {
//         console.log(file);
//         cb(null, Date.now() + path.extname(file.originalname));
//         console.log("b");
//       } catch (err) {
//         console.error("Error in filename function:", err);
//         cb(err);
//       }
//     }
// })
// const upload = multer({storage: storage});

// app.get("upload", (req, res) => {
//   res.render("upload");
// })

// app.post("/upload", upload.single("image"), (req,res) => {
//  // console.log(req.body)
//   res.status(200).json({
//         message: 'Image uploaded successfully',      
//   })
//   console.log("c");
// })

// fs.readdir('Images', (err, files) => {
//   if (err) {
//     console.error('Error reading "Images" folder:', err);
//   } else {
//     console.log('Files in "Images" folder:', files);
//   }
// });

// app.listen(8000, function () {
//   console.log('Server started on port 8000 (http://localhost:8000');
// });


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


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var ba64 = require('ba64')
var cors = require('cors')

var app = express();

app.use(cors());

// view engine setup
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/upload', async (req, res, next) => {
  
  const { name, message, ...files } = req.body

  for(let key in files){
    const base64 = files[key]

    // check if it's correctly formatted Base64 Data URI
    if(checkBase64(base64)){
      // Write it to our root directory using input key as filename
      // eg. picture[1]
      ba64.writeImageSync(key, base64)
    }
  }

  res.send({files})
})

function checkBase64(string){
  const B64_REGEX = /^data:.*;base64,([0-9a-zA-Z+\/]{4})*(([0-9a-zA-Z+\/]{2}==)|([0-9a-zA-Z+\/]{3}=))?$/i 

  return B64_REGEX.test(string)
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, function () {
  console.log('Server started on port 8000 (http://localhost:8000');
});

module.exports = app;


