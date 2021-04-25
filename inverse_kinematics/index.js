import * as PIXI from 'pixi.js';
import Circle from './circle.js';
import Line from './line.js';

let linkLength = 50;
const branchLength = document.getElementById('branchLength');
branchLength.value = linkLength;

const app = new PIXI.Application({ backgroundColor: 0xbbbbbb });
const viewport = document.getElementById('viewport');
viewport.appendChild(app.view);

const circleRadius = 10;
const startX = 400;
const startY = 300;
const joints = 5;
const circles = [];
const lines = [];

const target = new Circle(app, {
  radius: circleRadius,
	x: startX,
	y: ((joints - 1) * linkLength) + startY + 50,
	color: 0xff0000,
	draggable: true,
	onUpdate() {},
});

// create joints
for (let i = 0; i < joints; i++) {
	circles.push(new Circle(app, {
    radius: circleRadius,
		x: startX,
		y: (i * linkLength) + startY,
		draggable: false,
		color: 0x555555,
		onUpdate() {},
	}));
}

const reachableTarget = new Circle(app, {
  radius: circleRadius,
	x: startX,
	y: ((joints - 1) * linkLength) + startY,
	color: 0x0000ff,
	draggable: false,
	onUpdate() {},
});

// create lines and connect them to joint positions
for (let i = 0; i < (circles.length - 1); i++) {
	lines.push(new Line(app, 0, 0, 0, 0));
}
circles.forEach((circle, index) => {
	circle.onUpdate = updateJoint.bind(this, index);
	updateJoint(index, circle.x, circle.y);
});

// update joint and lines positions when length is updated
branchLength.addEventListener('input', (event) => {
	linkLength = parseInt(event.target.value, 10);
	circles.forEach((circle, index) => {
		circle.y = index * linkLength + startY;
		circle.update();
		updateJoint(index, circle.x, circle.y);
	});
	updateTarget(target.x, target.y)
});

// update line positions based on joint position
function updateJoint(index, x, y) {
	if (index < lines.length) {
		lines[index].updateStart(x, y);
	}
	if (index > 0) {
		lines[index - 1].updateEnd(x, y);
	}
}

target.onUpdate = updateTarget;

function updateTarget(x, y) {
	const firstCircle = circles[0];
	const lastCircle = circles[circles.length - 1];
	const x1 = firstCircle.x;
	const y1 = firstCircle.y;
	const maxReach = linkLength * (circles.length - 1);
	const targetDistance = Math.hypot(x - x1, y - y1);
	if (targetDistance < maxReach) {
		reachableTarget.x = x;
		reachableTarget.y = y;
	} else {
		const xAngle = Math.acos((x - x1) / targetDistance);
    const yAngle = Math.asin((y - y1) / targetDistance);
		reachableTarget.x = firstCircle.x + (Math.cos(xAngle) * maxReach);
		reachableTarget.y = firstCircle.y + (Math.sin(yAngle) * maxReach);
	}
	reachableTarget.update();


  // implementation of Forward And Backward Reaching Inverse Kinematics (FABRIK)
  while (
    Math.abs(lastCircle.x - reachableTarget.x) > 3 ||
    Math.abs(lastCircle.y - reachableTarget.y) > 3) {
    // from end to start
    lastCircle.x = reachableTarget.x;
    lastCircle.y = reachableTarget.y;
    lastCircle.update();
    for (let i = circles.length - 2; i >= 0; i--) {
      updateCircles(i, 1);
    }

  	// from start to end
    firstCircle.x = startX;
    firstCircle.y = startY;
    firstCircle.update();
    for (let i = 1; i < circles.length - 1; i++) {
      updateCircles(i, -1);
    }
  }
}

function updateCircles(i, indexOffset) {
  let c1 = circles[i];
  let c2 = circles[i + indexOffset];
  let hypotenuse = Math.hypot(c1.x - c2.x, c1.y - c2.y);
  const xAngle = Math.acos((c1.x - c2.x) / hypotenuse);
  const yAngle = Math.asin((c1.y - c2.y) / hypotenuse);
  c1.x = c2.x + Math.cos(xAngle) * linkLength;
  c1.y = c2.y + Math.sin(yAngle) * linkLength;
  c1.update();
}

