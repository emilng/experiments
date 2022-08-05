function splitNum(numString) {
  const chunks = Math.floor( numString.length / 15 );
  const remainder = numString.length % 15;
  const numArray = [ numString.slice(0, remainder) ];
  for (let i = 0; i < chunks; i++) {
    const chunkStart = remainder + (i * 15);
    const chunkEnd = chunkStart + 15;
    numArray.unshift(numString.slice(chunkStart, chunkEnd));
  }
  return numArray;
}

function addSplits(aSplit, bSplit) {
  let a, b, c = 0;
  let sum = '';
  const maxChunks = Math.max(aSplit.length, bSplit.length);
  for (let i = 0; i < maxChunks; i++) {
    a = (i < aSplit.length) ? aSplit[i] : 0;
    b = (i < bSplit.length) ? bSplit[i] : 0;
    let d = String(Number(a) + Number(b) + Number(c));
    if (d.length > 15) {
      c = d[0];
      d = d.slice(1);
    } else {
      c = 0;
    }
    sum = d + sum;
  }
  if (c > 0) {
    sum = c + sum;
  }
  return sum;
}

function add(a, b) {
  if (String(a).length < 16 && String(b).length < 16) return String(Number(a) + Number(b));
  return addSplits(splitNum(a), splitNum(b));
}

function expect(input, output) {
  console.log('');
  console.log(input);
  console.log(output);
  console.log(input === output);
  console.log('');
}

expect(add('3874', '90938498237058927340892374089'), '90938498237058927340892377963');
expect(add('63829983432984289347293874', '1292374089'), '63829983432984290639667963');
expect(add('93829983432984289347293874', '90938498237058927340892374089'), '91032328220491911630239667963');
expect(add('90938498237058927340892374089', '90938498237058927340892374089'), '181876996474117854681784748178');

