const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { urlencoded } = require('body-parser');
const convertToImage = require('convert-base64-to-image')
const {PythonShell} = require('python-shell');

const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended:true}));
/////////////////////////////////////////////////
let modelLoaded = false;

let options = {
  mode: 'text',
  scriptPath: path.join(__dirname, 'path/to/your/python/script'),
};

function loadModel() {
  return new Promise((resolve, reject) => {
    if (modelLoaded) {
      resolve();
      return;
    }
    pyshell = new PythonShell('predict.py', options);
    pyshell.on('error', reject);
    pyshell.on('close', () => {
      modelLoaded = true;
      resolve();
    });
  });
}

async function predict(input) {
  await loadModel();
  return new Promise((resolve, reject) => {
    pyshell.send(JSON.stringify(input));
    pyshell.on('message', (message) => {
      const prediction = JSON.parse(message);
      resolve(prediction);
    });
    pyshell.on('error', reject);
  });
}
module.exports = { predict };
const { predict } = require('./predictor');

(async () => {
  const input1 = [1, 2, 3, 4, 5];
  const prediction1 = await predict(input1);
  console.log('Prediction 1:', prediction1);
})();

////////////////////////////////////////////////////
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./Images/")
  },
  filename: function (req, file, cb) {
    cb(null, 'image' + "-" + Date.now()+".jpg")
  }
})


var upload = multer({storage:storage});

app.post('/upload', upload.single('image'), uploadImage);

function uploadImage(req,res){

  console.log('post stuff');
  console.log(req.body.image);
  console.log(req.body.mode);

  // decode the base64 string to a Buffer
 const imageBuffer = Buffer.from(req.body.image, 'base64');

  // generate a unique filename for the image
  const filename = `image-${Date.now()}.jpg`;
  convertToImage.converBase64ToImage(req.body.image, `./Images/${filename}`);
  predict(`./Images/${filename}`);
}

app.listen(8000, function () {
  console.log('Server started on port 8000 (http://localhost:8000');
});

module.exports = app;


