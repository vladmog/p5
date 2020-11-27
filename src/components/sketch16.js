
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
        p5.noLoop();
        p5.background(255)
	};



	const draw = p5 => {
        p5.background(255)



        const generateLines = (x1, y1, x2, y2, x3, y3, x4, y4, count) => {
            
            // reference line1 === x1, y1, x2, y2
            const line1XLength = (x1 - x2) * -1
            const line1YLength = (y1 - y2) * -1
            const line1XInterval = line1XLength / (count - 1)
            const line1YInterval = line1YLength / (count - 1)

            
            // reference line2 === x3, y3, x4, y4
            const line2XLength = (x3 - x4) * -1
            const line2YLength = (y3 - y4) * -1
            const line2XInterval = line2XLength / (count - 1)
            const line2YInterval = line2YLength / (count - 1)
            
            for (let i = 0; i < count; i++) {
                let currX1 = x1 + (i * line1XInterval)
                let currY1 = y1 + (i * line1YInterval)

                let currX2 = x3 + (i * line2XInterval)
                let currY2 = y3 + (i * line2YInterval)

                p5.line(currX1, currY1, currX2, currY2)
            }
        }

        let margin = 0
        let x1 = margin
        let y1 = margin
        let x2 = margin
        let y2 = canvasHeight - margin

        let x3 = canvasWidth - margin
        let y3 = margin
        let x4 = canvasWidth - margin
        let y4 = canvasHeight - margin


        generateLines(x1, y1, x2, y2, x3, y3, x4, y4, 30)

	};

	const windowResized = p5 => {
		canvasWidth = p5.windowWidth;
		if (canvasWidth > 500) canvasWidth = 500;
		canvasWidth -= 75;
		p5.resizeCanvas(canvasWidth, canvasWidth);
	};

	return <Sketch setup={setup} draw={draw} />;
};
