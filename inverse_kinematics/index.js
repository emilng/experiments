import * as PIXI from 'pixi.js';
import Circle from './circle.js';
import Line from './line.js';
import IK from './ik.js';

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

let ik;


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

const target = new Circle(app, {
  radius: circleRadius,
	x: startX,
	y: ((joints - 1) * linkLength) + startY + 50,
	color: 0x0000ff,
	draggable: true,
	onUpdate() {},
});

updateIK();

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
    circle.x = startX;
		circle.y = index * linkLength + startY;
		circle.update();
	});
  updateIK();
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
  ik.updateTarget(x, y);
  circles.forEach((circle, index) => {
    circle.x = ik.points[index].x;
    circle.y = ik.points[index].y;
    circle.update();
  });
}

function updateIK() {
  const points = circles.map((circle) => {
    return { x: circle.x, y: circle.y };
  });
  ik = new IK(points);
}
