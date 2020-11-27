
import React from "react";
import Sketch from "react-p5";


export default props => {
	let canvasWidth;
	let canvasHeight;

	const setup = (p5, canvasParentRef) => {
		canvasWidth = p5.windowWidth;
		if (canvasWidth > 500) canvasWidth = 500;
		canvasWidth -= 75;
		canvasHeight = canvasWidth;
		p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
		p5.frameRate(30);
		p5.angleMode("degrees");
		p5.frameRate(800);
		p5.background(255);
		// p5.noFill()

		p5.noLoop();
	};

	let dots = 2300;
	// let dots = 1;

	const draw = p5 => {
		// let c = canvasHeight / 115; // approx between 2 and 3.7
		let c = 10; // approx between 2 and 3.7
		p5.translate(canvasWidth / 2, canvasHeight / 2);
		for (let n = 0; n < dots; n++) {
			if (n === 0) {
				n = 0.5;
			}
			let a = n * 137.5;
			let r = c * p5.sqrt(n);

			let x = r * p5.cos(a);
			let y = r * p5.sin(a);

			let size = canvasHeight / 100;

			p5.fill(0);
			// p5.ellipse(x, y, size, size);

			const createCircle = (center, diameter) => {
				// center: Array[Number,Number]
				// diameter: Number
				p5.noFill()
				p5.ellipse(center[0], center[1], diameter, diameter);
			};
	
			const createNestedCircle = (nCenter, nDiameter, layers) => {
				createCircle(nCenter, nDiameter);
				let layerDiameters = [];
				let layerCenters = [];
				for (let layer = 1; layer <= layers; layer++) {
					let layerDiameter = (layer / layers) * nDiameter;
					let layerCenterX =
						nCenter[0] - nDiameter / 2 + layerDiameter / 2;
					let layerCenterY = nCenter[1];
					layerDiameters.push(layerDiameter);
					layerCenters.push([layerCenterX, layerCenterY]);
				}
				for (let layer = 0; layer < layerDiameters.length; layer++) {
					createCircle(
						layerCenters[layers - layer - 1],
						layerDiameters[layers - layer - 1]
					);
				}
	
				// Linear decrease in diameter size (decrease in fractions of diameter i.e 5 steps of 1/5th of D)
				// Equal movement of center of circle in a certain direction
				// Vertical or Horizontal movement are straightforward.
				// For diagonal movement, calculate hypotenuse (or derive by rotation to simplify things)
	
				// for next iteration, include angle and distance of smallest circle's center from main center (range from 0 to main diameter - minor radius)
				// perhaps rotated circles within rotated circles via recursive functions
			};
	
			let center = [x, y];
			let diameter = 18;
			let layers = 5;
	
			p5.stroke(1)
			p5.push()
			p5.translate(x, y)
			p5.rotate(a)
			createNestedCircle([0,0], diameter, layers);
			p5.pop()
		}
	};

	const windowResized = p5 => {
		canvasWidth = p5.windowWidth;
		if (canvasWidth > 500) canvasWidth = 500;
		canvasWidth -= 75;
		p5.resizeCanvas(canvasWidth, canvasWidth);
	};

	return <Sketch setup={setup} draw={draw} />;
};
