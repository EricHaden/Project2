const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { urlencoded } = require('body-parser');

const app = express();
var upload = multer();
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended:true}));

app.use(upload.array()); 
app.use(express.static('public'));

app.post('/upload', (req, res)=>{
  console.log('post stuff');
  console.log(req.body.image);
})

app.listen(8000, function () {
  console.log('Server started on port 8000 (http://localhost:8000');
});

module.exports = app;
