import * as PIXI from 'pixi.js';
import Circle from './circle.js';
import Line from './line.js';

const app = new PIXI.Application({ backgroundColor: 0xbbbbbb });
const viewport = document.getElementById('viewport');
viewport.appendChild(app.view);

const startY = 40;

const circles = [];

for (let i = 0; i < 5; i++) {
	circles.push(new Circle(app, 400, (i * 100) + startY));
}
circles.forEach((circle, index) => {
	circle.onUpdate = updateNode.bind(this, index);
});

const lines = [];
let i = 0;
const max = circles.length - 1;
while(i < max) {
	const x1 = circles[i].x;
	const y1 = circles[i].y;
	const x2 = circles[i + 1].x;
	const y2 = circles[i + 1].y;
	lines.push(new Line(app, x1, y1, x2, y2));
	i = i + 1;
}

const branchLength = document.getElementById('branchLength');
branchLength.addEventListener('input', (event) => {
	const length = event.target.value;
	circles.forEach((circle, index) => {
		circle.y = index * length + startY;
		circle.update();
	});
	lines.forEach((line, index) => {
		line.updateStart(circles[index].x, circles[index].y);
		line.updateEnd(circles[index + 1].x, circles[index + 1].y);
	});
});

function updateNode(index, x, y) {
	if (index < lines.length) {
		lines[index].updateStart(x, y);
	}
	if (index > 0) {
		lines[index - 1].updateEnd(x, y);
	}
}