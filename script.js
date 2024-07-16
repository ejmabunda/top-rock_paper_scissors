function getHumanChoice() {
    return prompt("Rock, paper or scissors?");
}

function getComputerChoice() {
    let randnum = Math.random();
    if (randnum >= 0 && randnum < 1/3) {
        return "rock";
    }
    else if (randnum >= 1/3 && randnum < 2/3) {
        return "paper";
    }
    else {
        return "scissors"
    }
}

function playRound(computerChoice, humanChoice) {
    wins = {
        "rock": ["scissors", "rock crushes scissors"],
        "paper": ["rock", "paper covers rock"],
        "scissors": ["paper", "scissors cuts paper"],
        "": ["", "we played the same move"]
    }
    
    if (computerChoice == humanChoice) {
        return {"": wins[""][1]};
    }
    else if (wins[humanChoice][0] == computerChoice) {
        return {"human": wins[humanChoice][1]};
    }
    else if (wins[computerChoice][0] == humanChoice) {
        return {"computer": wins[computerChoice][1]};
    }
    console.log(computerChoice, humanChoice);
    return null;
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    
    for (let x = 0; x < 5; x++) {
        console.log(`Round ${x + 1}: You:${humanScore}, Me:${computerScore}`);
        let humanChoice = getHumanChoice();
        let computerChoice = getComputerChoice();
        
        // To manually stop the game
        if (humanChoice == "") {
            return;
        }
    
        let winner = playRound(computerChoice, humanChoice);
        // console.log(Object.keys(winner));
    
        if (winner.hasOwnProperty("human")) {
            message = "you win this round.";
            humanScore++;
        }
        else if (winner.hasOwnProperty("computer")) {
            message = "I win this round.";
            computerScore++;
        }
        else {
            message = "no one wins this round."
        }
        
        console.log(`Hmm.. ${humanChoice} and ${computerChoice}. Since ${Object.values(winner)[0]}, ${message}`);
    }
    if (humanScore == computerScore) {
        winner = "no one";
    }
    else if (humanScore > computerScore) {
        winner = "you";
    }
    else {
        winner = "I";
    }
    console.log(`Game over.......\n-> Final score: You:${humanScore}, Me:${computerScore}, GGs, ${winner} won the game.`);
}

playGame();
