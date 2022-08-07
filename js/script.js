/*----- constants -----*/
/*----- app's state (variables) -----*/
let computerTurn;
let playerTurn;
let yourScore;
let highScore;
let message;
let playerSeq;
let computerSeq;
let color;
/*----- cached element references -----*/
let playerEl = document.querySelectorAll(".btn")


/*----- event listeners -----*/
playerEl.forEach(function(e){
    e.addEventListener("click", getElement)
})
/*----- functions -----*/
init()

function init() {
  computerTurn = 0
  playerChoice = 0
  yourScore = 0
  highScore = 0
  message = "Press any key to start the game"
  playerSeq = [];
  computerSeq = [];

//   render()
}

function getElement(){
    playerChoice = this.getAttribute("id")
    playerSeq.push(playerChoice)
    buttonPressed(playerChoice);
}

function buttonPressed(color){
    console.log(color)
    document.getElementById(color).classList.add("active")
    
    setTimeout(function(){
        document.getElementById(color).classList.remove("active")
    }, 200)
}
