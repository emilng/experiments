// find value of depth multiplied by horizontal position

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'day02.txt'), { encoding: 'utf8' }).toString();


const cmdlist = data
  .split('\n')
  .map(cmd => {
    const cmdsplit = cmd.split(' ');
    return {
      dir: cmdsplit[0],
      value: parseInt(cmdsplit[1], 10),
    };
  });

const part1Actions = {
  forward(state, value) {
    state.hpos += value;
    return state;
  },
  up(state, value) {
    state.depth -= value;
    return state;
  },
  down(state, value) {
    state.depth += value;
    return state;
  },
}

const part2Actions = {
  forward(state, value) {
    state.hpos += value;
    state.depth += (state.aim * value);
    return state;
  },
  up(state, value) {
    state.aim -= value;
    return state;
  },
  down(state, value) {
    state.aim += value;
    return state;
  },
}

const main = (cmdlist, actions, label) => {
  const { hpos, depth } = cmdlist.reduce((state, { dir, value }) => {
    return actions[dir](state, value);
  }, { aim: 0, hpos: 0, depth: 0 });

  console.log(label, hpos * depth);
}

main(cmdlist, part1Actions, 'part 1 ');
main(cmdlist, part2Actions, 'part 2 ');