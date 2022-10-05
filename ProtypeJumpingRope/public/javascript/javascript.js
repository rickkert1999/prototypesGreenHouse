const socket = io();

let timeLeft = 60;

socket.on("data", function (data) {
  console.log(data);

  //calculate earnings
  let score = data;
  let jumpCoin = data / 15;
  let eth = jumpCoin / 28216.70428894;
  let euro = eth * 1364.43;

  document.getElementById("score").innerHTML = score;
  document.getElementById("jumpCoin").innerHTML = jumpCoin.toFixed(2);
  document.getElementById("eth").innerHTML = eth.toFixed(6);
  document.getElementById("euro").innerHTML = euro.toFixed(3);

  //count down timer
  if (score == 1) {
    const countDown = setInterval(function () {
      timeLeft--;
      if (timeLeft <= 0 || timeLeft < 1) {
        document.getElementById("timeLeft").innerHTML = 0;

        clearInterval(countDown);

        socket.close();
      } else {
        document.getElementById("timeLeft").innerHTML = timeLeft;

        if (timeLeft == 30 || 20 || 15 || 10 || 5 || 3 || 1) {
          document.getElementById("timeLeft").style.color = "red";
        } else {
          document.getElementById("timeLeft").style.color = "#ecf34c";
        }
      }
    }, 1000);
  }
});
