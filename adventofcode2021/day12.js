const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day12.txt'), { encoding: 'utf8' }).toString();

let pathData = data
  .split('\n')
  .map(line => {
    return line.split('-');
  });

const nodes = {};

const updateNode = (a, b) => {
  if (b === 'start') return;
  if (nodes[a]) {
    if (!nodes[a].includes(b)) nodes[a].push(b);
  } else {
    if (a !== 'end') nodes[a] = [b];
  }
}

pathData.forEach(([a, b]) => {
  updateNode(a, b);
  updateNode(b, a);
});

let foundPaths = {};
const traverse = ({ allowSecondVisit, node, path, secondVisited, visited }) => {
  let pathCount = 0;
  nodes[node].forEach(linkedNode => {
    if (!visited.includes(linkedNode)) {
      const isSingleVisitNode = linkedNode.toLowerCase() === linkedNode;
      const state = {
        allowSecondVisit,
        node: linkedNode,
        path: [...path, linkedNode],
        secondVisited,
        visited: isSingleVisitNode ? [...visited, linkedNode] : visited,
      }
      if (linkedNode === 'end') {
        const pathString = [...path, 'end'].join(',');
        if (!foundPaths[pathString]) {
          foundPaths[pathString] = true;
          pathCount++;
        }
      } else {
        pathCount += traverse(state);
        if (allowSecondVisit && isSingleVisitNode && !secondVisited) {
          pathCount += traverse({ ...state, visited, secondVisited: true });
        }
      }
    }
  });
  return pathCount;
}

const initState = {
  allowSecondVisit: false,
  node: 'start',
  path: ['start'],
  visited: [],
};
let pathCount;

foundPaths = {};
console.log('Part 1', traverse(initState));

foundPaths = {};
console.log('Part 2', traverse({ ...initState, allowSecondVisit: true }));
