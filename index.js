const prompt = require('prompt');
const chalk = require('chalk');
const Board = require('./Board');

const board = new Board();

const displayInstructions = function displayInstructions() {
  console.log('Select a position to play at and press enter.\nPositions are shown below:');
  console.log('0|1|2\n-----\n3|4|5\n-----\n6|7|8\n\n');
};

let turn = Math.random() > 0.5 ? 0 : 1;

const handleMove = function handleMove(player, position) {
  console.log(position);
  try {
    board.play(player, position);
    const result = board.checkForWin();
    if (result) {
      console.log(`${player} wins the game!`);
    } else {
      playNextRound();
    }
  } catch (e) {
    console.log(chalk.red('Try a different position.'));
    turn -= 1;
    playNextRound();
  }
};

const playNextRound = function playNextRound() {
  console.log('The current board is:');
  console.log(board.display());
  const currentPlayer = turn % 2 ? 'x' : 'o';
  turn += 1;
  if (currentPlayer === 'x') {
    console.log(chalk.blue(`\n\nIt is your move ${currentPlayer}\n`));
  } else {
    console.log(chalk.green(`\n\nIt is your move ${currentPlayer}\n`));
  }
  displayInstructions();
  prompt.start();
  const schema = {
    properties: {
      position: {
        pattern: /\d/,
        message: 'Position must be a number between 0 and 8',
        required: true,
      },
    },
  };
  prompt.get(schema, (err, result) => {
    handleMove(currentPlayer, result.position);
  });
};

playNextRound();