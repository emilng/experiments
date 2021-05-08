import * as PIXI from 'pixi.js';

class Circle {
	constructor(app, { radius, x, y, color, draggable, onUpdate }) {
		this.app = app;

		// draw a circle
		const graphics = new PIXI.Graphics();
		graphics.beginFill(0xcccccc);
		graphics.lineStyle(2, color, 1);
		graphics.drawCircle(radius/2,radius/2, radius);
		graphics.endFill();

		// create a sprite from a circle graphic
		const texture = app.renderer.generateTexture(graphics);

		const circle = new PIXI.Sprite(texture);

		// set origin to center
		circle.anchor.set(0.5);

		if (draggable) {
			// allow sprite to be draggable
			circle.interactive = true;
			circle.buttonMode = true;

			// add mouse and touch events for dragging
			this.onDragStart = this.onDragStart.bind(this);
			this.onDragEnd = this.onDragEnd.bind(this);
			this.onDragMove = this.onDragMove.bind(this);
			circle
				.on('pointerdown', this.onDragStart)
				.on('pointerup', this.onDragEnd)
				.on('pointerupoutside', this.onDragEnd)
				.on('pointermove', this.onDragMove);
		}

		this.circle = circle;
		this.x = x;
		this.y = y;

		app.stage.addChild(circle);

		this.onUpdate = onUpdate;
		this.update();
	}

	destroy() {
		this.app.stage.removeChild(this.circle);
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