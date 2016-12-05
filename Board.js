const _ = require('lodash');

const displayRow = function displayRow(startI, storage) {
  return `${storage[startI] === 0 ? ' ' : storage[startI]}|${storage[startI + 1] === 0 ? ' ' : storage[startI + 1]}|${storage[startI + 2] === 0 ? ' ' : storage[startI + 2]}\n`;
};

class Board {
  constructor() {
    this.storage = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  display() {
    let result = '';
    for (let i = 0; i < this.storage.length; i += 3) {
      result += displayRow(i, this.storage);
      if (i < 5) {
        result += '-----\n';
      }
    }
    return result;
  }
  /**
   * Checks the board for a win
   * @return {String} The player who won (i.e. 'x' or 'o')
   * */
  checkForWin() {
    const players = ['x', 'o'];
    for (let i = 0; i <= 1; i += 1) {
      const player = players[i];
      // check rows
      for (let j = 0; j < this.storage.length; j += 3) {
        if (_.every(this.storage.slice(j, j + 3), item => item === player)) {
          return player;
        }
      }
      // check columns
      for (let k = 0; k < 3; k += 1) {
        const column = this.storage.filter((item, ind) => (ind - k) % 3 === 0);
        if (_.every(column, item => item === player)) {
          return player;
        }
      }
      // check major diagonal
      if (this.storage[0] === player && this.storage[4] === player && this.storage[8] === player) {
        return player;
      }
      // check minor diagonal
      if (this.storage[2] === player && this.storage[4] === player && this.storage[6] === player) {
        return player;
      }
    }
    if (_.every(this.storage, item => item !== 0)) {
      return 'Tie';
    }
    return null;
  }

  play(player, position) {
    if (this.storage[position] !== 0) {
      throw new Error('Position is already occupied');
    }
    this.storage[position] = player;
  }
}

module.exports = Board;
