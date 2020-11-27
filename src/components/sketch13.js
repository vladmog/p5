
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
		p5.frameRate(800);
		p5.background(255);

		p5.noLoop();
	};

	let dots = 2300;

	const draw = p5 => {
		let c = canvasHeight / 115; // approx between 2 and 3.7
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
			size = size * ((dots - n) / dots);

			p5.fill(0);
			p5.ellipse(x, y, size, size);
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
