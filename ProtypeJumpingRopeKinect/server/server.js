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

kinect.on("bodyFrame", function (bodyFrame) {
  //looking in array for tracked bodies and use the first
  const trackedBody = bodyFrame.bodies.find(({ tracked }) => !!tracked);

  if (!trackedBody) return;

  if (
    trackedBody.joints[3].cameraZ > 2 &&
    trackedBody.joints[3].cameraZ < 2.5
  ) {
    //console.log(trackedBody.joints[3]);

    //if something is the same place for x amount of seconds start
    setTimeout(function () {
      console.log("tets");
    }, 3000);

    //store heigt

    //add + one if person jumps

    //send to client
  }
});

if (kinect.open()) {
  console.log("Kinect opened!");
}

//request body frames
kinect.openBodyReader();

//instal npm's: socket.io, express, kinect-azure/kinect2
