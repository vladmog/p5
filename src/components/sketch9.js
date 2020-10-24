import React from "react";
import Sketch from "react-p5";

 
export default (props) => {

    let canvasWidth
    let canvasHeight

    const setup = (p5, canvasParentRef) => {
        canvasWidth = p5.windowWidth
        if(canvasWidth > 500) canvasWidth = 500
        canvasWidth -= 75
        canvasHeight = canvasWidth
        p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);  
        p5.noLoop()
    };
    
    
    const draw = (p5) => {
        p5.background(255)
        let gridSize = 50;
        let cellSize = canvasWidth / gridSize

        // Generates a grid of "\" and "/" symbols that create a maze
        for (let i = 0; i < canvasHeight; i += cellSize){
            for (let j = 0; j < canvasWidth; j += cellSize){
                // Define four corner coordinates of grid cell
                let x1 = j;
                let x2 = j + cellSize;
                let y1 = i;
                let y2 = i + cellSize;

                // Ratio defines likelyhood of diagonal being a "\" or a "/"
                let ratio
                if (j < canvasHeight / 2){
                    ratio = 0.85
                } else {
                    ratio = 0.15
                }

                if (p5.random(0,1) > ratio){
                    p5.line(x1, y1, x2, y2) // "\""
                } else {
                    p5.line(x1, y2, x2, y1) // "/""
                }
            }
        }
    };


    const windowResized = (p5) => {
        canvasWidth = p5.windowWidth
        if(canvasWidth > 500) canvasWidth = 500
        canvasWidth -= 75
        p5.resizeCanvas(canvasWidth, canvasWidth);

    }
 
    return <Sketch setup={setup} draw={draw} />;
};

