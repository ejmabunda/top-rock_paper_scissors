function getHumanChoice() {
    return prompt('rock, paper or scissors?');
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

let humanScore = 0;
let computerScore = 0;
let round = 1;

function playRound(humanChoice) {
    let computerChoice = getComputerChoice();
    wins = {
        "rock": ["scissors", "rock crushes scissors"],
        "paper": ["rock", "paper covers rock"],
        "scissors": ["paper", "scissors cuts paper"],
        "": ["", "we played the same move"]
    }
    
    if (computerChoice == humanChoice) {
        playGame({"": wins[""][1]}, humanChoice, computerChoice);
    }
    else if (wins[humanChoice][0] == computerChoice) {
        playGame({"human": wins[humanChoice]}, humanChoice, computerChoice);
    }
    else if (wins[computerChoice][0] == humanChoice) {
        playGame({"computer": wins[computerChoice]}, humanChoice, computerChoice);
    }
    else console.log(computerChoice, humanChoice, 'something went wrong..');

    round++;
    console.log(humanChoice, computerChoice);
}

function playGame(winnerDict, humanChoice, computerChoice) {
    // Write message for winner
    document.querySelector('.round').textContent = `Round ${round}`;
    if (winnerDict.hasOwnProperty("human")) {
        message = "you win this round.";
        humanScore++;
        document.querySelector('.player .score').textContent = humanScore;
    }
    else if (winnerDict.hasOwnProperty("computer")) {
        message = "I win this round.";
        computerScore++;
        document.querySelector('.computer .score').textContent = computerScore;
    }
    else {
        message = "no one wins this round."
    }
    
    // Anounce round winner
    document.querySelector('.round').textContent = 
    `Hmm.. ${humanChoice} and ${computerChoice}. Since ${Object.values(winnerDict)[0]}, ${message}`;

    // Reset game every 5 rounds
    if (round >= 5) {
        if (humanScore == computerScore) {
            winner = "no one";
        }
        else if (humanScore > computerScore) {
            winner = "you";
        }
        else {
            winner = "I";
        }

        resetGame();

        document.querySelector('.player .score').textContent = 0;
        document.querySelector('.computer .score').textContent = 0;

        document.querySelector('.results').textContent = 
        `That was 5 rounds\nGGs, ${winner} won this game.`;
    }
    else document.querySelector('.results').textContent = '';
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    round = 1;
}

let playerSelectionsButtons = document.querySelectorAll('.player-selection');
for (const selection of playerSelectionsButtons) {
    selection.addEventListener('click', () => {
        playRound(selection.textContent.toLowerCase());
    });
}
