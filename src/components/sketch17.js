
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
        // p5.frameRate(1)
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

        const generateGrid = (gridSize, complexity, x1, y1, x2, y2, strokeWeight) => {
            p5.strokeWeight(strokeWeight);

            const rowLength = (x1 - x2) * -1
            const columnInterval = rowLength / (gridSize)
            const columnLength = (y1 - y2) * -1
            const rowInterval = columnLength / (gridSize)

            for (let row = 0; row < gridSize; row++){
                let currY1 = y1 + row * rowInterval;
                let currY2 = y1 + (row + 1) * rowInterval
                for (let column = 0; column < gridSize; column++){
                    let currX1 = x1 + column * columnInterval;
                    let currX2 = x1 + (column + 1) * columnInterval
                    let randomNum = p5.random([1, 2, 3, 4])
                    let override = false;
                    let distFromCenter = Math.floor(gridSize/2) - Math.floor((Math.abs(((gridSize - 1)/2) - row) + Math.abs(((gridSize - 1)/2) - column))/2) + 1
                    let multiplier = 4;
                    complexity = distFromCenter * multiplier;
                    console.log("complexity", complexity)

                    // Top left corner
                    if (override || randomNum !== 1) generateLines(currX1, currY1, currX2-rowInterval/2, currY1, currX1, currY2-rowInterval/2, currX1, currY1, complexity)
                    // Top right corner
                    if (override || randomNum !== 2) generateLines(currX1+rowInterval/2, currY1, currX2, currY1, currX2, currY1, currX2, currY2-rowInterval/2, complexity)
                    // Bottom left corner
                    if (override || randomNum !== 3) generateLines(currX1, currY1+rowInterval/2, currX1, currY2, currX1, currY2, currX2-rowInterval/2, currY2, complexity)
                    // Bottom right corner
                    if (override || randomNum !== 4) generateLines(currX1+rowInterval/2, currY2, currX2, currY2, currX2, currY2, currX2, currY1 + rowInterval/2, complexity)
                }
            }

        }

        let margin = 0

        let gridSize = 5


        let complexity = 8

        let strokeWeight = .5

        let x1 = margin
        let y1 = margin
        let x2 = canvasWidth - margin
        let y2 = canvasHeight - margin

        generateGrid(gridSize, complexity, x1, y1, x2, y2, strokeWeight)
        

    
	};

	const windowResized = p5 => {
		canvasWidth = p5.windowWidth;
		if (canvasWidth > 500) canvasWidth = 500;
		canvasWidth -= 75;
		p5.resizeCanvas(canvasWidth, canvasWidth);
	};

	return <Sketch setup={setup} draw={draw} />;
};
