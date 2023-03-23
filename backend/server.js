const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

// Endpoint to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  const file = req.body;
  if (!file) {
    const error = new Error('Please select an image to upload');
    error.status = 418;
    return next(error);
  }
  res.status(200).json({
    message: 'Image uploaded successfully',
    filename: file.filename
  });
});



// Start the server
app.listen(8000, function () {
  console.log('Server started on port 8000 (http://localhost:8000');
});
