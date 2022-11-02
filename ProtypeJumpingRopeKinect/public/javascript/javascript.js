const socket = io();

let timeLeft = 30;
const halfTime = timeLeft / 2;

const collectionMusic = [
  "J&E_music-1.mp3",
  "J&E_music-2.mp3",
  "J&E_music-3.mp3",
  "J&E_music-4.mp3",
  "J&E_music-5.mp3",
  "J&E_music-6.mp3",
  "J&E_music-7.mp3",
];

const collectionStartSound = ["30-seconden.mp3", "we-gaan-beginnen.mp3"];

const collectionSounds = [
  "jij-bent-heel-snel.mp3",
  "jij-gaat-winnen.mp3",
  "jouw-naam-op-leaderbord.mp3",
  "lekkerbezig.mp3",
  "niet-bang-voor-zweet.mp3",
  "op-de-helft.mp3",
  "single-whoooo.mp3",
  "tak-tak-lekkerspringen.mp3",
  "wedstrijd-met-jezelf.mp3",
  "wil-jij-die-nft.mp3",
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
    document.getElementById("drawing").classList.add("flash");
    document.getElementById("greyBox").classList.add("flash");

    audioStartNmbr = Math.floor(Math.random() * collectionStartSound.length);
    audioStart = new Audio(
      "../audio/sounds/" + collectionStartSound[audioStartNmbr]
    );
    audioStart.play();

    //play random song for motivation
    audioNmbr = Math.floor(Math.random() * collectionMusic.length);
    audio = new Audio("../audio/music/" + collectionMusic[audioNmbr]);
    audio.volume = 0.2;
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
          document.getElementById("timeLeft").style.color = "#037cff";
        }
      }

      if (timeLeft == halfTime) {
        soundNmbr = Math.floor(Math.random() * collectionSounds.length);
        sound = new Audio("../audio/sounds/" + collectionSounds[soundNmbr]);
        sound.play();
      }
    }, 1000);
  }
});
