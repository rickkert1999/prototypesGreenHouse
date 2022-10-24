//express npm
const express = require("express");
const app = express();

//socket.io npm
const http = require("http").Server(app);
const io = require("socket.io")(http);

//define server port
const serverPort = process.env.PORT || 3000;

//kinect2 npm
var Kinect2 = require("kinect2");
var kinect = new Kinect2();

//setup the folder
app.use(express.static("public")); //set the public folder to static
app.get("/", function (req, res) {
  res.sendFile("public/index.html", { root: __dirname }); //your html file path
});

//Whenever someone connects this gets executed
io.on("connection", function (socket) {
  console.log("A user connected");
});

//declare the port
http.listen(serverPort, function () {
  console.log(
    "listening on port: " +
      serverPort +
      "\n" +
      "listening on: http://localhost:" +
      serverPort
  );
});

///Kinect/////////////////
let backup = false;
let jump = 0;

kinect.on("bodyFrame", function (bodyFrame) {
  //looking in array for tracked bodies and use the first
  const trackedBody = bodyFrame.bodies.find(({ tracked }) => !!tracked);

  if (!trackedBody) return;

  //console.log(trackedBody.joints[3]);

  let heigtJoint;
  let heigtJointPlus;

  if (
    trackedBody.joints[3].cameraZ > 2 &&
    trackedBody.joints[3].cameraZ < 2.5 &&
    !backup
  ) {
    backup = true;

    //if something is the same place for x amount of seconds start
    setTimeout(function () {
      //store heigt
      heigtJoint = trackedBody.joints[3].cameraY;
      heigtJointPlus = heigtJoint + 0.01;
      console.log(heigtJoint);
      console.log("jump: " + jump);
    }, 3000);

    console.log(heigtJointPlus);

    //add + one if person jumps
    if (trackedBody.joints[3].cameraY > heigtJointPlus) {
      jump++;
      console.log("jump: " + jump);
    }
  }

  //send to client
});

if (kinect.open()) {
  console.log("Kinect opened!");
}

//request body frames
kinect.openBodyReader();

//instal npm's: socket.io, express, kinect-azure/kinect2
