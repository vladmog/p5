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
		// p5.noLoop();
	};

	let iterator = 0;

	const draw = p5 => {
		// Iterator creates sin wave for offset value
		let offset = p5.sin(iterator);
		if (iterator === 360) {
			iterator = 0;
		} else {
			iterator += 0.02;
		}

		// Helper function
		const createCircle = (center, diameter) => {
			// center: Array[Number,Number]
			// diameter: Number
			p5.ellipse(center[0], center[1], diameter, diameter);
		};

		const createNestedCircle = (nCenter, nDiameter, layers, offset) => {
			// nCenter: Array[Number, Number]
			// nDiameter: Number
			// layers: Number
			// offset: Number(-1 <= offset <= 1)

			// Define layer diameters and centers
			let layerDiameters = [];
			let layerCenters = [];
			for (let layer = layers; layer >= 1; layer--) {
				if (layer === layers) {
					layerDiameters.push(nDiameter);
					layerCenters.push(nCenter);
					continue;
				}

				// Parent layer's center and diameter determine child layer's center
				let prevDiameter = layerDiameters[layerDiameters.length - 1];
				let prevCenter = layerCenters[layerCenters.length - 1];

				let layerDiameter = (layer / layers) * nDiameter;

				// Potential Center Range: x length within parent layer within which child's center may be placed
				let potentialCenterRange = prevDiameter - layerDiameter;

				let layerCenterX =
					prevCenter[0] + (potentialCenterRange * offset) / 2;
				let layerCenterY = nCenter[1];

				layerDiameters.push(layerDiameter);
				layerCenters.push([layerCenterX, layerCenterY]);
			}

			// Plot layers
			for (let layer = 0; layer < layerDiameters.length; layer++) {
				createCircle(layerCenters[layer], layerDiameters[layer]);
			}
		};

		//
		let center = [canvasHeight / 2, canvasHeight / 2];
		let diameter = canvasHeight - 50;
		let layers = 5;

		createNestedCircle(center, diameter, layers, offset);
	};

	const windowResized = p5 => {
		canvasWidth = p5.windowWidth;
		if (canvasWidth > 500) canvasWidth = 500;
		canvasWidth -= 75;
		p5.resizeCanvas(canvasWidth, canvasWidth);
	};

	return <Sketch setup={setup} draw={draw} />;
};
