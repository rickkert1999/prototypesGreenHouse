const socket = io();

let timeLeft = 30;

socket.on("jump", (jump) => {
  console.log(jump);

  //calculate earnings
  let score = jump;
  let jumpCoin = jump / 15;
  let eth = jumpCoin / 28216.70428894;
  let euro = eth * 1364.43;

  document.getElementById("score").innerHTML = score;
  document.getElementById("jumpCoin").innerHTML = jumpCoin.toFixed(2);
  document.getElementById("eth").innerHTML = eth.toFixed(6);
  document.getElementById("euro").innerHTML = euro.toFixed(3);

  //count down timer
  if (score == 1) {
    const countDown = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0 || timeLeft < 1) {
        document.getElementById("timeLeft").innerHTML = 0;

        clearInterval(countDown);

        socket.close();
      } else {
        document.getElementById("timeLeft").innerHTML = timeLeft;

        if (
          timeLeft == 30 ||
          timeLeft == 20 ||
          timeLeft == 15 ||
          timeLeft == 10 ||
          timeLeft == 5 ||
          timeLeft == 3 ||
          timeLeft == 1
        ) {
          document.getElementById("timeLeft").style.color = "red";
        } else {
          document.getElementById("timeLeft").style.color = "#fb1650";
        }
      }
    }, 1000);
  }
});
