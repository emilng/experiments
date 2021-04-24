import * as PIXI from 'pixi.js';

class Line {
	constructor(app, x1, y1, x2, y2) {
		const line = new PIXI.Graphics();
		line.lineStyle(2, 0xff0000, 1);
		this.line = line;
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;

		app.stage.addChild(line);

		this.update();
	}

	updateStart(x1, y1) {
		this.x1 = x1;
		this.y1 = y1;
		this.update();
	}

	updateEnd(x2, y2) {
		this.x2 = x2;
		this.y2 = y2;
		this.update();
	}

	update() {
		const { line, x1, y1, x2, y2 } = this;
		line.clear();
		line.lineStyle(2, 0xff0000, 1);
		line.moveTo(x1, y1);
		line.lineTo(x2, y2);
		line.closePath();
	}
}

export default Line;