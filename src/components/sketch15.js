
import React from "react";
import Sketch from "react-p5";

// Phyllotaxis

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
		p5.frameRate(200);
		p5.background(255);
		// p5.noFill()

		// p5.noLoop();
	};

    let dots = 170;
    let iterator = 1
	// let dots = 1;

	const draw = p5 => {
		let c = 4 * (canvasHeight / 115); // approx between 9 and 16
        p5.translate(canvasWidth / 2, canvasHeight / 2);
        p5.background(255)
		for (let n = 0; n < dots; n++) {
			if (n === 0) {
				n = 0.5;
			}
			let a = n * 137.5;
			let r = c * p5.sqrt(n);

			let x = r * p5.cos(a);
			let y = r * p5.sin(a);

			let size = canvasHeight / 100;

            // Iterator creates sin wave for offset value
            let offset = p5.sin(iterator + n);

			const createCircle = (center, diameter) => {
				// center: Array[Number,Number]
				// diameter: Number
				p5.noFill()
				p5.ellipse(center[0], center[1], diameter, diameter);
			};
	
			const createNestedCircle = (nCenter, nDiameter, layers) => {
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
	
            // let diameter = 23;
            let diameter = canvasHeight * 0.05411764705882353;
            console.log(diameter/canvasHeight)
			let layers = 5;
	
			p5.stroke(1)
			p5.push()
			p5.translate(x, y)
            p5.rotate(a)
            // p5.background(255);

			createNestedCircle([0,0], diameter, layers, offset);
			p5.pop()
        }
        iterator ++
	};

	const windowResized = p5 => {
		canvasWidth = p5.windowWidth;
		if (canvasWidth > 500) canvasWidth = 500;
		canvasWidth -= 75;
		p5.resizeCanvas(canvasWidth, canvasWidth);
	};

	return <Sketch setup={setup} draw={draw} />;
};
