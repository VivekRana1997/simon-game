/*----- constants -----*/
const color = ["red", "blue", "yellow", "green"];
/*----- app's state (variables) -----*/
let computerTurn;
let playerTurn;
let yourScore;
let highScore;
let message;
let playerSeq;
let computerSeq
let randomNum;
let colorCode;
let gameStart;
let finish;
let darkMode;

/*----- cached element references -----*/
let playerEl = document.querySelectorAll(".btn");
let yourScoreEl = document.getElementById("your-score");
let highScoreEl = document.getElementById("high-score");
let gameoverEl = document.querySelector(".game-over");
let buttonEl = document.getElementById("button");
let startEl = document.querySelector("h2");
let finalEl = document.getElementById("score");
let button2El = document.getElementById("b2");

/*----- event listeners -----*/
playerEl.forEach(function (e) {
  e.addEventListener("click", getElement);
});
document.addEventListener("keypress", keyboard);

buttonEl.addEventListener("click", reset);

button2El.addEventListener("click", modes);


/*----- functions -----*/

init();

function computerFn() {
  randomNum = Math.floor(Math.random() * 4);
  computerSeq.push(color[randomNum]);
  animation(color[randomNum]);
  sound(color[randomNum]);
}

function init() {
  computerSeq = [];
  playerSeq = [];
  playerChoice = "";
  yourScore = 0;
  highScore = 0;
  randomNum = 0;
  colorCode = "";
  gameStart = false;
  finish = false;
  darkMode = true;
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
    if(gameStart === false){
      computerFn();
      gameStart = true;
    }
      
  } else {
    if(finish === false)
    presskey(e);
  }
}

function compareChoices() {
  if (playerSeq[playerSeq.length - 1] === computerSeq[playerSeq.length - 1]) {
    if (playerSeq.length === computerSeq.length) {
      setTimeout(function () {
        yourScore++;
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
  finish = true;
  gameoverEl.classList.add("display");
  if (yourScore < highScore) {
    finalEl.innerHTML = yourScore;
  } else {
    finalEl.innerHTML = `is the high score: ${highScore}`;
  }
}

function reset() {
  finish = false;
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

function modes(){
  if(darkMode){
    document.querySelector("body").classList.add("new")
    button2El.innerHTML = "Light"
    darkMode = false
  }else{
    document.querySelector("body").classList.remove("new")
    button2El.innerHTML = "Dark"
    darkMode = true
  }
}