//player and computer choice

// let player and computer choice be defined as indices of the array choices

const choiceOptions = ["rock", "paper", "scissors"];

//turn player and computer choices into objects with attribute choice

const player = {
  choice: null,
};
const computer = {
  choice: null,
};

player.choice = choiceOptions[0];

function playGame(player) {
  computer.choice = choiceOptions[Math.floor(Math.random() * 3)];
  console.log(
    "computer choice",
    computer.choice,
    "player choice",
    player.choice
  );
  //tie
  if (player.choice === computer.choice) {
    console.log("It's a tie!");
  }
  //const choiceOptions = ["rock", "paper", "scissors"]; 0,1,2
  //player wins scenarios below
  else if (
    (player.choice === choiceOptions[0] &&
      computer.choice === choiceOptions[2]) ||
    (player.choice === choiceOptions[1] &&
      computer.choice === choiceOptions[0]) ||
    (player.choice === choiceOptions[2] && computer.choice === choiceOptions[1])
  ) {
    console.log("Player wins! Computer loses!");
  }
  //player loses
  else {
    console.log("Player loses! Computer wins!");
  }
}
console.log("THIS is GAME", playGame());
