let userScore=0;
let compScore=0;

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const drawGame=()=>{
    msg.innerText="Game was Draw!! Play Again";
     msg.style.backgroundColor = "#081b31";
}

const clearSelection = () => {
    choices.forEach(choice => {
        choice.classList.remove("selected");
    });
};


const genCompChoice=()=>{
    let options=["rock","paper","scissors"];
    const randomIndex=Math.floor(Math.random()*3);
    return(options[randomIndex]);
}
const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }else{
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "#c43b3bff";
    }
}

const enableClicks = () => {
    choices.forEach(choice => choice.style.pointerEvents = "auto");
};

const playGame=(userChoice)=>{
    clearSelection();
    choices.forEach(choice => choice.style.pointerEvents = "none");

    const compChoice=genCompChoice();

    document.querySelector(`#${userChoice}`).classList.add("selected");
    setTimeout(()=>{
        document.querySelector(`#${compChoice}`).classList.add("selected");
    },100);

    if(userChoice===compChoice){
        drawGame();
        enableClicks();
        return;
    }
    let userWin=true;
    if(userChoice==="rock"){
        userWin=compChoice=="paper"? false:true;
    }else if(userChoice==="paper"){
        userWin=compChoice==="scissors"?false:true;
    }else{
        userWin=compChoice==="rock"?false:true;
    }
    
    showWinner(userWin,userChoice,compChoice);
    setTimeout(enableClicks, 500);
}

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id");
        playGame(userChoice);
    })
})