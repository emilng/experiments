import * as PIXI from 'pixi.js';
import Circle from './circle.js';
import Line from './line.js';

const branchLength = document.getElementById('branchLength');

const app = new PIXI.Application({ backgroundColor: 0xbbbbbb });
const viewport = document.getElementById('viewport');
viewport.appendChild(app.view);

const startX = 400;
const startY = 40;
let linkLength = 100;

const circles = [];
const lines = [];

const target = new Circle(app, {
	x: startX,
	y: 500,
	color: 0xff0000,
	draggable: true,
	onUpdate() {},
});

// create joints
for (let i = 0; i < 5; i++) {
	circles.push(new Circle(app, {
		x: 400,
		y: (i * linkLength) + startY,
		draggable: false,
		color: 0x555555,
		onUpdate() {},
	}));
}

const reachableTarget = new Circle(app, {
	x: startX,
	y: 440,
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
		const angle = Math.acos((x - x1) / targetDistance);
		reachableTarget.x = firstCircle.x + (Math.cos(angle) * maxReach);
		reachableTarget.y = firstCircle.y + (Math.sin(angle) * maxReach);
	}
	reachableTarget.update();

	// from end to start

	// from start to end
}
