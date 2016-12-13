const expect = require('chai').expect;
const Board = require('./Board');

describe('The tic tac toe board', () => {
  it('should detect horizontal wins', () => {
    const board = new Board();
    board.storage = ['x', 'x', 'x', 0, 0, 0, 0, 0, 0];
    expect(board.checkForWin()).to.equal('x');
  });
  it('should detect vertical wins', () => {
    const board = new Board();
    board.storage = ['o', 0, 0, 'o', 0, 0, 'o', 0, 0];
    expect(board.checkForWin()).to.equal('o');
  });
  it('should detect major diagonal wins', () => {
    const board = new Board();
    board.storage = ['o', 0, 0, 0, 'o', 0, 0, 0, 'o'];
    expect(board.checkForWin()).to.equal('o');
  });
  it('should detect minor diagonal wins', () => {
    const board = new Board();
    board.storage = [0, 0, 'x', 0, 'x', 0, 'x', 0, 0];
    expect(board.checkForWin()).to.equal('x');
  });
  it('should detect a tie', () => {
    const board = new Board();
    board.storage = ['o', 'x', 'o', 'x', 'o', 'o', 'x', 'o', 'x'];
    expect(board.checkForWin()).to.equal('Tie');
  });
});
