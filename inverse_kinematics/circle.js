import * as PIXI from 'pixi.js';

class Circle {
	constructor(app, x, y) {
		// draw a circle
		const graphics = new PIXI.Graphics();
		graphics.beginFill(0xcccccc);
		graphics.lineStyle(2, 0xff0000, 1);
		graphics.drawCircle(40,40, 20);
		graphics.endFill();

		// create a sprite from a circle graphic
		const texture = app.renderer.generateTexture(graphics);

		const circle = new PIXI.Sprite(texture);

		// allow sprite to be draggable
		circle.interactive = true;
		circle.buttonMode = true;

		// set origin to center
		circle.anchor.set(0.5);

		// add mouse and touch events for dragging
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.onDragMove = this.onDragMove.bind(this);
		circle
			.on('pointerdown', this.onDragStart)
			.on('pointerup', this.onDragEnd)
			.on('pointerupoutside', this.onDragEnd)
			.on('pointermove', this.onDragMove);

		this.circle = circle;
		this.x = x;
		this.y = y;

		app.stage.addChild(circle);

		this.onUpdate = () => {};
		this.update();
	}

	update() {
		const { circle, onUpdate, x, y } = this;
		circle.x = x;
		circle.y = y;
		onUpdate(x, y);
	}

	onDragStart(event) {
		this.circle.data = event.data;
		this.circle.dragging = true;
	}

	onDragEnd() {
		this.circle.data = null;
		this.circle.dragging = false;
	}

	onDragMove() {
		if (this.circle.dragging) {
			const newPosition = this.circle.data.getLocalPosition(this.circle.parent);
			this.x = newPosition.x;
			this.y = newPosition.y;
			this.update();
		}
	}
}

export default Circle;