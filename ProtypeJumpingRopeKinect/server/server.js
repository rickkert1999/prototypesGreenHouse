//express npm
const express = require("express");
const app = express();

//socket.io npm
const http = require("http").Server(app);
const io = require("socket.io")(http);

//define server port
const serverPort = process.env.PORT || 3000;

// io.emit("data", line);

//setup the folder
app.use(express.static("public")); //set the public folder to static
app.get("/", function (req, res) {
  res.sendFile("public/index.html", { root: __dirname }); //your html file path
});

//Whenever someone connects this gets executed
io.on("connection", function (socket) {
  console.log("A user connected");

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });

  //restard server
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

/////kinect////////////////////////////////////////////////////////

var Kinect2 = require("kinect2");
var kinect = new Kinect2();

if (kinect.open()) {
  console.log("Kinect opened!");
}

kinect.on("bodyFrame", function (bodyFrame) {
  //tracking mutable bodys
  // for (var i = 0; i < bodyFrame.bodies.length; i++) {
  //   if (bodyFrame.bodies[i].tracked) {
  //     console.log(bodyFrame.bodies[i]);
  //   }
  // }

  //look for tracked body
  const trackedBody = bodyFrame.bodies.find(({ tracked }) => !!tracked);

  if (!trackedBody) return;

  if (
    trackedBody.joints[3].cameraZ > 2 &&
    trackedBody.joints[3].cameraZ < 2.5
  ) {
    console.log(trackedBody.joints[3]);

    //if something is the same place for x amount of seconds start

    //store data point

    //+ 1 each time someone jumps above this point
  }
});

//request body frames
kinect.openBodyReader();

// //close the kinect after 1 minute
// setTimeout(function () {
//   kinect.close();
//   console.log("Kinect Closed");
// }, 60000);

//instal npm's: socket.io, express, kinect-azure/kinect2
