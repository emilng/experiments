const outputBinaryBlock = (num, width, height) => {
  const numString = Number(num).toString(2).padStart(width * height, '0');
  console.log('');
  let binRow = '';
  for (let i = 0; i <= numString.length; i++) {
    if (numString[i] === '1') {
      binRow = binRow + 'X';
    } else {
      binRow = binRow + '—';
    }
    if ((i + 1) % width === 0) {
      console.log(binRow);
      binRow = '';
    }
  }
  console.log('');
}

const outputGrid = (grid) => {
  console.log('');
  grid.forEach(line => {
    console.log(line.join(''));
  });
  console.log('');
}

module.exports = { outputBinaryBlock, outputGrid };
