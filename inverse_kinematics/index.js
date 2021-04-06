import * as PIXI from 'pixi.js'

const app = new PIXI.Application({ backgroundColor: 0xbbbbbb });
document.body.appendChild(app.view);

// draw a circle
const graphics = new PIXI.Graphics();
graphics.beginFill(0xcccccc);
graphics.lineStyle(2, 0xff0000, 1);
graphics.drawCircle(40,40, 20);
graphics.endFill();

// create a sprite from a circle graphic
const texture = app.renderer.generateTexture(graphics);

const circles = [];

for (let i = 0; i < 5; i++) {
	circles.push(createCircle(400, (i * 100) + 80));
}

function createCircle(x, y) {
	const circle = new PIXI.Sprite(texture);

	// allow sprite to be draggable
	circle.interactive = true;
	circle.buttonMode = true;

	// set origin to center
	circle.anchor.set(0.5);

	// add mouse and touch events for dragging
	circle
		.on('pointerdown', onDragStart)
		.on('pointerup', onDragEnd)
		.on('pointerupoutside', onDragEnd)
		.on('pointermove', onDragMove);

	circle.x = x;
	circle.y = y;


	app.stage.addChild(circle);

	return circle;
}

function onDragStart(event) {
	this.data = event.data;
	this.dragging = true;
}

function onDragEnd() {
	this.data = null;
	this.dragging = false;
}

function onDragMove() {
	if (this.dragging) {
		const newPosition = this.data.getLocalPosition(this.parent);
		this.x = newPosition.x;
		this.y = newPosition.y;
	}
}