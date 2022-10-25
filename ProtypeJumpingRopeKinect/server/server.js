//express npm
const express = require("express");
const { rmSync } = require("fs");
const app = express();

//socket.io npm
const http = require("http").Server(app);
const io = require("socket.io")(http);

//define server port
const serverPort = process.env.PORT || 3000;

//kinect2 npm
var Kinect2 = require("kinect2");
var kinect = new Kinect2();

//var for kinect npm
let backup = false;
let jump = 0;
let heightJoint;
let heightJointPlus;

//setup the folder
app.use(express.static("public")); //set the public folder to static
app.get("/", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname }); //your html file path
});

//Whenever someone connects this gets executed
io.on("connection", (socket) => {
  console.log("A user connected");

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  //reset values if pages gets refreshed
  jump = 0;
  backup = false;
  heightJointPlus = undefined;
});

//declare the port
http.listen(serverPort, () => {
  console.log(
    "listening on port: " +
      serverPort +
      "\n" +
      "listening on: http://localhost:" +
      serverPort
  );
});

kinect.on("bodyFrame", (bodyFrame) => {
  //looking in array for tracked bodies and use the first
  const trackedBody = bodyFrame.bodies.find(({ tracked }) => !!tracked);

  if (!trackedBody) return;

  if (
    trackedBody.joints[3].cameraZ > 2 &&
    trackedBody.joints[3].cameraZ < 2.5 &&
    !backup
  ) {
    backup = true;

    //if something is the same place for x amount of seconds start
    setTimeout(() => {
      //store height
      heightJoint = trackedBody.joints[3].cameraY;
      heightJointPlus = heightJoint + 0.1;
      console.log(heightJoint);
      console.log("jump: " + jump);
      io.emit("jump", jump);
      // return heightJointPlus;
    }, 3000);
  }

  if (trackedBody.joints[3].cameraY > heightJointPlus) {
    //debounce so it doesn't count more than 1 jump

    jump++;
    console.log("jump: " + jump);

    //send to client
    io.emit("jump", jump);
  }
});

if (kinect.open()) {
  console.log("Kinect opened!");
}

//request body frames
kinect.openBodyReader();

//instal npm's: socket.io, express, kinect-azure/kinect2
