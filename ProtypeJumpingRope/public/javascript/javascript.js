const socket = io();

socket.on("data", function (data) {
  console.log(data);

  document.getElementById("score").innerHTML = data;
});
