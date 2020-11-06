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
		p5.noLoop();
	};

	const draw = p5 => {
		const createCircle = (center, diameter) => {
			// center: Array[Number,Number]
			// diameter: Number
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
				console.log(
					"create circle",
					layerCenters[layer],
					layerDiameters[layer]
				);
			}

			// Linear decrease in diameter size (decrease in fractions of diameter i.e 5 steps of 1/5th of D)
			// Equal movement of center of circle in a certain direction
			// Vertical or Horizontal movement are straightforward.
			// For diagonal movement, calculate hypotenuse (or derive by rotation to simplify things)

			// for next iteration, include angle and distance of smallest circle's center from main center (range from 0 to main diameter - minor radius)
			// perhaps rotated circles within rotated circles via recursive functions
		};

		let center = [canvasHeight / 2, canvasHeight / 2];
		let diameter = canvasHeight - 50;
		let layers = 10;

		createNestedCircle(center, diameter, layers);
	};

	const windowResized = p5 => {
		canvasWidth = p5.windowWidth;
		if (canvasWidth > 500) canvasWidth = 500;
		canvasWidth -= 75;
		p5.resizeCanvas(canvasWidth, canvasWidth);
	};

	return <Sketch setup={setup} draw={draw} />;
};
