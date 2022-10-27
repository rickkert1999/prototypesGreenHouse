const socket = io();

let timeLeft = 30;

let readySound = new Audio("../audio/readyLetsGo.wav");

const collection = [
  "DeepskyRide.mp3",
  "BoneCrackerJukebox.mp3",
  "It'sTrickyJukebox.mp3",
  "BassInvadersJukebox.mp3",
  "SlayboarderJukebo.mp3",
  "Superwoman.mp3",
  "BassInvadersJukebox.mp3",
  "OverseerScrewUp.mp3",
  "FlukeSwitchTwitch.mp3",
  "E-VilleSonicAnimation.mp3",
];

window.onload = () => {
  document.getElementById("alert").style.display = "block";
};

document.getElementById("alertBtn").addEventListener("click", () => {
  document.getElementById("alert").style.display = "none";
});

//get data from server
socket.on("jump", (jump) => {
  console.log(jump);

  if (jump == 0) {
    readySound.play();

    //play random song for motivation
    audioNmbr = Math.floor(Math.random() * collection.length);
    audio = new Audio("../audio/" + collection[audioNmbr]);
    audio.volume = 0.5;
    audio.play();
  }

  //calculate earnings
  let score = jump;
  let jumpCoin = jump / 15;
  let eth = jumpCoin / 28216.70428894;
  let euro = eth * 1364.43;

  //diplay the ammount
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

        //create feedback to the countdown
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
