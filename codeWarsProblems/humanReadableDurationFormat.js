function parseDuration (seconds) {
  const second = 1;
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = day * 365;

  const durations = [
    { name: 'year', duration: year },
    { name: 'day', duration: day },
    { name: 'hour', duration: hour },
    { name: 'minute', duration: minute },
    { name: 'second', duration: second },
  ];

  const durationList = [];
  let remainingSeconds = seconds;
  let durationIndex = 0;
  let durationToCheck;
  let currentDuration = 0;
  while (remainingSeconds > 0) {
    durationToCheck = durations[durationIndex];
    if (durationToCheck.duration <= remainingSeconds) {
      currentDuration = Math.floor(remainingSeconds / durationToCheck.duration);
      durationList.push({ name: durationToCheck.name, duration: currentDuration });
      remainingSeconds = remainingSeconds - currentDuration * durationToCheck.duration;
    }
    durationIndex++;
  }
  return durationList;
}

function formatDurationObject({ duration, name, hasPrecedingDuration, isLastDuration }) {
  const delimiter = hasPrecedingDuration ? (isLastDuration ? ' and ' : ', ') : '';
  const plural = duration > 1 ? 's' : '';
  return `${delimiter}${duration} ${name}${plural}`;
}

function formatDurationList(durationList) {
  const durationCount = durationList.length;
  let currentDuration;
  let durationString = '';
  while (durationList.length) {
    const hasPrecedingDuration = durationString !== '';
    const isLastDuration = durationList.length === 1;
     durationString = durationString + formatDurationObject({ ...durationList.shift(), hasPrecedingDuration, isLastDuration });
    if (isLastDuration) {
      return durationString;
    }
  }
}

function formatDuration (seconds) {
  if (seconds === 0) return 'now';
  const durationList = parseDuration(seconds);
  return formatDurationList(durationList);
}

function expect(input, output) {
  console.log('');
  console.log(input);
  console.log(output);
  console.log(input === output);
  console.log('');
}

console.log(formatDuration(1));
console.log('');
console.log(formatDuration(62));
console.log('');
console.log(formatDuration(120));
console.log('');
console.log(formatDuration(3600));
console.log('');
console.log(formatDuration(3662));

// Test.assertEquals(formatDuration(1), "1 second");
// Test.assertEquals(formatDuration(62), "1 minute and 2 seconds");
// Test.assertEquals(formatDuration(120), "2 minutes");
// Test.assertEquals(formatDuration(3600), "1 hour");
// Test.assertEquals(formatDuration(3662), "1 hour, 1 minute and 2 seconds");
