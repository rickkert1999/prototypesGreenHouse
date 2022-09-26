//express npm
const express = require("express");
const app = express();

//socket.io npm
const http = require("http").Server(app);
const io = require("socket.io")(http);

//define server port
const serverPort = 3000;

//serialport npm (serialport)
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

//declair port (serialport)
var port = new SerialPort("COM5", { boudRate: 96000 });

//Read data that is available and show in terminal (serialport)
const parser = port.pipe(new Readline({ delimiter: "\r\n" }));

parser.on("data", function (line) {
  console.log(line);
  io.emit("data", line);
});

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
});

//declare the port
http.listen(3000, function () {
  console.log("listening on *:3000");
  console.log("listening on: http://localhost:" + serverPort);
});

//instal npm's: socket.io, express, serialport -v <10.x.x
