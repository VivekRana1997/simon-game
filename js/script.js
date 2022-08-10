/*----- constants -----*/
const color = ["red", "blue", "yellow", "green"];
/*----- app's state (variables) -----*/
let computerTurn;
let playerTurn;
let yourScore;
let highScore;
let message;
let playerSeq = [];
let computerSeq = [];
let randomNum;
let colorCode;

/*----- cached element references -----*/
let playerEl = document.querySelectorAll(".btn");
let yourScoreEl = document.getElementById("your-score");
let highScoreEl = document.getElementById("high-score");
let gameoverEl = document.querySelector(".game-over");
let buttonEl = document.querySelector("button");
let startEl = document.querySelector("h2");
let finalEl = document.getElementById("score");

/*----- event listeners -----*/
playerEl.forEach(function (e) {
  e.addEventListener("click", getElement);
});
document.addEventListener("keypress", keyboard);
// , {once : true})

buttonEl.addEventListener("click", reset);

// document.getElementById("button").addEventListener("keypress", function(e){
//     if(document.keyCode === 13){
//         reset();
//     }
// })

// document.addEventListener("keypress", presskey)

/*----- functions -----*/

function computerFn() {
  randomNum = Math.floor(Math.random() * 4);
  computerSeq.push(color[randomNum]);
  animation(color[randomNum]);
  sound(color[randomNum]);
}

init();

function init() {
  computerTurn = 0;
  playerChoice = 0;
  yourScore = 0;
  highScore = 0;
  message = "Press any key to start the game";
  randomNum = 0;
  colorCode = "";

  //   render()
}

function getElement() {
  playerChoice = this.getAttribute("id");
  playerSeq.push(playerChoice);
  sound(playerChoice);
  animation(playerChoice);
  compareChoices();
}

function animation(color) {
  document.getElementById(color).classList.add("active");

  setTimeout(function () {
    document.getElementById(color).classList.remove("active");
  }, 500);
}

function keyboard(e) {
  if (e.keyCode === 13) {
    computerFn();
  } else {
    presskey(e);
  }
}

function compareChoices() {
  if (playerSeq[playerSeq.length - 1] === computerSeq[playerSeq.length - 1]) {
    if (playerSeq.length === computerSeq.length) {
      setTimeout(function () {
        yourScore = yourScore + 1;
        yourScoreEl.innerHTML = yourScore;
        computerFn();
        playerSeq = [];
      }, 1000);
    }
  } else {
    sound("over");
    if (yourScore >= highScore) {
      highScore = yourScore;
      highScoreEl.innerHTML = highScore;
    }
    gameover();
  }
}

function gameover() {
  gameoverEl.classList.add("display");
  if (yourScore < highScore) {
    finalEl.innerHTML = yourScore;
  } else {
    finalEl.innerHTML = `is the high score: ${highScore}`;
  }
}

function reset() {
  gameoverEl.classList.remove("display");
  yourScore = 0;
  yourScoreEl.innerHTML = yourScore;
  computerSeq = [];
  playerSeq = [];
  setTimeout(computerFn, 700);
  startEl.innerHTML = "";
}

function sound(color) {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function presskey(e) {
  if (e.keyCode === 113) {
    playerSeq.push("red");
    colorCode = "red";
  } else if (e.keyCode === 119) {
    playerSeq.push("blue");
    colorCode = "blue";
  } else if (e.keyCode === 97) {
    playerSeq.push("yellow");
    colorCode = "yellow";
  } else if (e.keyCode === 115) {
    playerSeq.push("green");
    colorCode = "green";
  } else {
    gameover();
    sound("over");
    return;
  }
  sound(colorCode);
  animation(colorCode);
  compareChoices();
}
