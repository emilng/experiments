const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day04.txt'), { encoding: 'utf8' }).toString();

const lines = data
  .split('\n');

// get draw numbers
const drawNums = lines[0]
  .split(',')
  .map(num => parseInt(num, 10));

// parse boards
const boards = [];
let board = [];
for (let i = 2; i < lines.length; i++) {
  if (lines[i] !== '') {
    const row = lines[i]
      .split(' ')
      .filter(num => num !== '')
      .map(num => parseInt(num, 10));
    board = board.concat(row);
  } else {
    boards.push(board);
    board = [];
  }
}

const masks = [];
// create row masks
for (let i = 0; i < 5; i++) {
  const mask = 0b11111 << i * 5;
  masks.push(mask);
}
// create column masks
for (let i = 0; i < 5; i++) {
  const mask = 0b0000100001000010000100001 << i;
  masks.push(mask)
}

const getWinningBoard = (winningBoardNum) => {
  const boardMarkers = new Array(boards.length);
  const winningBoards = new Array(boards.length);
  let winCount = 0;

  for (let i = 0; i < drawNums.length; i++) {
    const drawNum = drawNums[i];
    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];
      if (!winningBoards[j]) {
        const numIndex = board.indexOf(drawNum);
        if (numIndex > -1) {
          const mask = 1 << 24 - numIndex;
          boardMarkers[j] = boardMarkers[j] |= mask;
          for (let k = 0; k < masks.length; k++) {
            if ((boardMarkers[j] & masks[k]) === masks[k]) {
              if (!winningBoards[j]) {
                winCount++;
                winningBoards[j] = true;
              }
              if (winningBoardNum === winCount) {
                return { board, markers: boardMarkers[j], drawNum };
              }
            }
          }
        }
      }
    }
  }
}

const getBoardSum = (winningBoardNum) => {
  const winningBoard = getWinningBoard(winningBoardNum);
  const markersArray = Number(winningBoard.markers)
    .toString(2)
    .padStart(25, '0')
    .split('')
    .map(num => num === '1');
  const unmarkedNumbers = winningBoard.board.filter((num, i) => !markersArray[i]);
  const unmarkedSum = unmarkedNumbers.reduce((sum, num) => sum + num, 0);
  return unmarkedSum * winningBoard.drawNum;
}

console.log('Part 1', getBoardSum(1));
console.log('Part 2', getBoardSum(boards.length));
