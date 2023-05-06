const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { urlencoded } = require('body-parser');
const convertToImage = require('convert-base64-to-image')
const {PythonShell} = require('python-shell');
const { isNull } = require('util');
const sleepp = require("system-sleep")

const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended:true}));
let spawnedAlready = false;
let pythonProcess = null;
let mode = '';
let player_decision = null;
let ai_decision = "";
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


var upload = multer({storage: storage});

//////////////////////////////////////////////////////////////ENDPOINTS
app.post('/upload', upload.single('image'), uploadImage);
app.post('/mode', upload.single('mode'), setMode);

//upload Image function called in endpoint
function uploadImage(req,res){
  console.log('made it to uploadImage');

  //generate a unique filename for the image
  const filename = `image-${Date.now()}.jpg`;
  convertToImage.converBase64ToImage(req.body.image, `./Images/${filename}`);

//python process spawn
  if (pythonProcess == null){
      const { spawn } = require('child_process');
      pythonProcess = spawn('python', ['../integration_testing/process_image.py']);
      spawnedAlready = true;
      console.log("spawning");
      pythonProcess.stdout.on('data', (data) => {
        console.log(`Received data from Python script: ${data}`);
        if (data == "rock\n" || data == "paper\n" || data == "scissors\n") {
          player_decision = data;
        } else {
          player_decision = null;
        }
      });
  }
  //mode check
  if (mode == "normal"){ //normal
    console.log("normal");
    const randInt = Math.floor(Math.random() * 3) + 1;
    console.log(randInt)
    pythonProcess.stdin.write(`../backend/Images/${filename}\n`);
    console.log("Waiting for response from the model\n");
    
    while (player_decision == null) {
       sleepp(1);
    }
    if (randInt == 1){
      pythonProcess.stdin.write("scissors\n");
      console.log("sending scissors");
      ai_decision = "scissors";
    } else if (randInt == 2){
      pythonProcess.stdin.write("rock\n");
      console.log("sending rock");
      ai_decision = "rock";
    } else if (randInt == 3){
      pythonProcess.stdin.write("paper\n");
      console.log("sending paper");
      ai_decision = "paper";
    }
    console.log(`Response received: ${player_decision}\n`);
  }else{          //competitive/god mode
    console.log("in god mode");
    pythonProcess.stdin.write(`../backend/Images/${filename}\n`);
    console.log("Waiting for response from the model\n");
    while (player_decision == null) {
      sleepp(1);
    }
    console.log(`Response received: ${player_decision}\n`);
    if (player_decision == "rock\n") {
      ai_decision = "paper";
    } else if (player_decision == "paper\n") {
      ai_decision = "scissors";
    } else {
      ai_decision = "rock";
    }
  }

  pythonProcess.stdin.write(`${ai_decision}\n`)

  let temp_result = 0;
  if (player_decision == (ai_decision + "\n")) {
    result = "DRAW";
  } else {
    if (player_decision == "rock\n") {
      if (ai_decision == "paper") {
        result = "YOU LOSE";
      } else {
        result = "YOU WIN";
      }
    } else if (player_decision == "paper\n") {
      if (ai_decision == "scissors") {
        result = "YOU LOSE";
      } else {
        result = "YOU WIN";
      }
    } else {
      if (ai_decision == "rock") {
        result = "YOU LOSE";
      } else {
        result = "YOU WIN";
      }
    }
  }
  //
  console.log(`ai_decision: ${ai_decision}, player_decision: ${player_decision}, result: ${result}`);
  console.log(result);
  res.send({ result });
  player_decision = null;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function setMode(req, res){
  console.log("setting mode");
  mode = req.body.mode;
  console.log(req.body.mode);
}

app.listen(8080, function () {
  console.log('Server started on port 8080 (http://0.0.0.0:8080');
});

module.exports = app;

