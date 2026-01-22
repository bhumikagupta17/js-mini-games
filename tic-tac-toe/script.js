let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let playerO=document.getElementById("player-o");
let playerX=document.getElementById("player-x");
const winnerModal = document.querySelector(".winner-modal");
const winnerText = document.getElementById("winner-text");
const newGameBtn = document.getElementById("new-game-btn");
let turnO= true //--player x, player y
playerO.classList.remove("hide");
let moveCount=0;
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.classList.remove("o-text","x-text");
    }
        playerO.classList.remove("hide");
        playerX.classList.add("hide");
        winnerModal.classList.add("hide");
        moveCount=0;
}
const resetGame=()=>{
    turnO=true;
    enableBoxes();
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turnO){
            box.innerText="O";
            box.classList.add("o-text");
            box.classList.remove("x-text");
            turnO=false;
            playerO.classList.add("hide");
            playerX.classList.remove("hide");
            moveCount++;
        }else{
            box.innerText="X";
            box.classList.add("x-text");
            box.classList.remove("o-text");
            turnO=true;
            playerX.classList.add("hide");
            playerO.classList.remove("hide");
            moveCount++;
        };
        box.disabled=true;//--so that once stored the button cant be changed
        checkWinner();
    })
})
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const showWinner=(winner)=>{
    winnerText.innerText=`Player ${winner} Wins🎉`;
    winnerModal.classList.remove("hide");
    playerO.classList.add("hide");
    playerX.classList.add("hide");

}
const showDraw=()=>{
    winnerText.innerText = "It's a Draw 🤝";
    winnerModal.classList.remove("hide");
    playerO.classList.add("hide");
    playerX.classList.add("hide");
}
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val==pos2Val && pos2Val==pos3Val){
                disableBoxes();
                showWinner(pos1Val);
                return;
            }
        }
        if(moveCount==9) showDraw();

    }
}
newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);
