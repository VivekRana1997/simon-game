/*----- constants -----*/
const color = ["red", "blue", "yellow", "green"]
/*----- app's state (variables) -----*/
let computerTurn;
let playerTurn;
let yourScore;
let highScore;
let message;
let playerSeq = [];
let computerSeq = [];
let randomNum


/*----- cached element references -----*/
let playerEl = document.querySelectorAll(".btn")


/*----- event listeners -----*/
playerEl.forEach(function(e){
    e.addEventListener("click", getElement)
})
document.addEventListener("keypress", keyboard)
/*----- functions -----*/


function computerFn(){
    randomNum = Math.floor(Math.random() * 4)
    computerSeq.push(color[randomNum])
    animation(color[randomNum])
}

init()

function init() {
  computerTurn = 0
  playerChoice = 0
  yourScore = 0
  highScore = 0
  message = "Press any key to start the game"
  randomNum = 0;
  
  


//   render()
}

function getElement(){
    playerChoice = this.getAttribute("id")
    playerSeq.push(playerChoice)
    animation(playerChoice);
    compareChoices();

}

function animation(color){
    document.getElementById(color).classList.add("active")
    
    setTimeout(function(){
        document.getElementById(color).classList.remove("active")
    }, 500)
}

function keyboard(){
    computerFn()
}

function compareChoices(){
    
    if(playerSeq[playerSeq.length - 1] === computerSeq[playerSeq.length - 1]){
        if(playerSeq.length === computerSeq.length){
            setTimeout(function(){
                computerFn()
                playerSeq = [];
                
            },1000)
        }
    }else{
        console.log("Game over")
    }
}