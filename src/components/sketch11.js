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
		p5.noFill();
		p5.angleMode("degrees");
		// p5.noLoop();
	};

	let iterator = 0;

	const draw = p5 => {
		// Iterator creates sin wave for offset value
		p5.translate(canvasWidth / 2, canvasWidth / 2);
		let offset = p5.sin(iterator);

		iterator += 1;

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
		let center = [0, 0];
		let diameter = canvasHeight - 50;
		let layers = 5;

		p5.background(255);
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

//========================================================================================

// import React from "react";
// import Sketch from "react-p5";

// export default props => {
// 	let canvasWidth;
// 	let canvasHeight;

// 	const setup = (p5, canvasParentRef) => {
// 		canvasWidth = p5.windowWidth;
// 		if (canvasWidth > 500) canvasWidth = 500;
// 		canvasWidth -= 75;
// 		canvasHeight = canvasWidth;
// 		p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
// 		p5.noFill();
// 		p5.angleMode("degrees");
// 		// p5.noLoop();
// 	};

// 	let iterator = 0;

// 	const draw = p5 => {
// 		// Iterator creates sin wave for offset value
// 		p5.translate(canvasWidth / 2, canvasWidth / 2);
// 		let offset = p5.sin(iterator);

// 		iterator += 0.3;

// 		// Helper function
// 		const createCircle = (center, diameter) => {
// 			// center: Array[Number,Number]
// 			// diameter: Number
// 			p5.ellipse(center[0], center[1], diameter, diameter);
// 		};

// 		const createNestedCircle = (nCenter, nDiameter, layers, offset) => {
// 			// nCenter: Array[Number, Number]
// 			// nDiameter: Number
// 			// layers: Number
// 			// offset: Number(-1 <= offset <= 1)

// 			// Define layer diameters and centers
// 			let layerDiameters = [];
// 			let layerCenters = [];
// 			for (let layer = layers; layer >= 1; layer--) {
// 				if (layer === layers) {
// 					layerDiameters.push(nDiameter);
// 					layerCenters.push(nCenter);
// 					continue;
// 				}

// 				// Parent layer's center and diameter determine child layer's center
// 				let prevDiameter = layerDiameters[layerDiameters.length - 1];
// 				let prevCenter = layerCenters[layerCenters.length - 1];

// 				let layerDiameter = (layer / layers) * nDiameter;

// 				// Potential Center Range: x length within parent layer within which child's center may be placed
// 				let potentialCenterRange = prevDiameter - layerDiameter;

// 				let layerCenterX =
// 					prevCenter[0] + (potentialCenterRange * offset) / 2;
// 				let layerCenterY = nCenter[1];

// 				layerDiameters.push(layerDiameter);
// 				layerCenters.push([layerCenterX, layerCenterY]);
// 			}

// 			// Plot layers

// 			for (let layer = 0; layer < layerDiameters.length; layer++) {
// 				createCircle(layerCenters[layer], layerDiameters[layer]);
// 			}
// 		};

// 		//
// 		let center = [0, 0];
// 		let diameter = canvasHeight - 50;
// 		let layers = 30;
// 		p5.push();
// 		p5.rotate(iterator);
// 		p5.background(255);
// 		createNestedCircle(center, diameter, layers, offset);

// 		p5.push();
// 		p5.rotate(180);
// 		createNestedCircle(center, diameter, layers, offset);
// 		p5.pop();

// 		p5.push();
// 		p5.rotate(270);
// 		createNestedCircle(center, diameter, layers, offset);
// 		p5.pop();

// 		p5.push();
// 		p5.rotate(90);
// 		createNestedCircle(center, diameter, layers, offset);
// 		p5.pop();
// 		p5.pop();
// 	};

// 	const windowResized = p5 => {
// 		canvasWidth = p5.windowWidth;
// 		if (canvasWidth > 500) canvasWidth = 500;
// 		canvasWidth -= 75;
// 		p5.resizeCanvas(canvasWidth, canvasWidth);
// 	};

// 	return <Sketch setup={setup} draw={draw} />;
// };
