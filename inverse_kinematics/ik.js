class IK {
	constructor(points) {
		this.points = points;
		this.linkLengths = this.getLinkLengths(points);
		this.maxReach = this.getMaxReach(this.linkLengths);
	}

	// create list of distances between each point
	getLinkLengths(points) {
		const linkLengths = [];
		for (let i = 0; i < points.length - 1; i += 1) {
			const p1 = points[i];
			const p2 = points[i + 1];
			const linkLength = Math.hypot(p1.x - p2.x, p1.y - p2.y);
			linkLengths.push(linkLength);
		}
		return linkLengths;
	}

	// calculate maximum reach from link lengths
	getMaxReach(linkLengths) {
		let maxReach = 0;
		linkLengths.forEach((linkLength) => {
			maxReach += linkLength;
		});
		return maxReach;
	}

	// update points in IK chain based on position of target
	updateTarget(x, y) {
		const p1 = this.points[0];
		const xDistance = x - p1.x;
		const yDistance = y - p1.y;
		const targetDistance = Math.hypot(xDistance, yDistance);
		if (targetDistance < this.maxReach) {
			// if target is closer than maximum reach then run IK algorithm
			this.updateIKChain(x, y);
		} else {
			// if target is further than maximum reach then chain forms straight line
			this.updateLine(xDistance, yDistance, targetDistance);
		}
	}

	updateLine(xDistance, yDistance, targetDistance) {
		const xAngle = Math.acos( xDistance / targetDistance );
		const yAngle = Math.asin( yDistance / targetDistance );
		const p1 = this.points[0];
		this.points.forEach((point, index) => {
			if (index > 0) {
				const linkLength = this.linkLengths[index - 1];
				point.x = p1.x + (Math.cos(xAngle) * index * linkLength);
				point.y = p1.y + (Math.sin(yAngle) * index * linkLength);
			}
		});
	}

	// implementation of Forward And Backward Reaching Inverse Kinematics (FABRIK)
	updateIKChain(x, y) {
		const p1 = this.points[0];
		const pN = this.points[this.points.length - 1];
		const startX = p1.x;
		const startY = p1.y;

		// repeat until the last point is close enough to the target position
		while(
			Math.abs(pN.x - x) > 2 ||
			Math.abs(pN.y - y) > 2) {
			// from end to start
			pN.x = x;
			pN.y = y;
			for (let i = this.points.length - 2; i >= 0; i -= 1) {
				this.updatePoint(i, 1, this.linkLengths[i]);
			}

			// from start to end
			p1.x = startX;
			p1.y = startY;
			for (let i = 1; i < this.points.length - 1; i += 1) {
				this.updatePoint(i, -1, this.linkLengths[i])
			}
		}

	}

	// update point in single step of FABRIK algorithm
	updatePoint(index, indexOffset, linkLength) {
		const p1 = this.points[index];
		const p2 = this.points[index + indexOffset];
		const hypotenuse = Math.hypot(p1.x - p2.x, p1.y - p2.y);
		const xAngle = Math.acos((p1.x - p2.x) / hypotenuse);
	  const yAngle = Math.asin((p1.y - p2.y) / hypotenuse);
	  p1.x = p2.x + Math.cos(xAngle) * linkLength;
	  p1.y = p2.y + Math.sin(yAngle) * linkLength;
	}
}

export default IK;