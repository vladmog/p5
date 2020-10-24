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
        let i;
        let j;
        for (i = 0; i < canvasHeight; i += cellSize){
            for (j = 0; j < canvasWidth; j += cellSize){
                let x1 = j;
                let y1 = i;
                let x2 = j + cellSize;
                let y2 = i + cellSize;
                let ratio
                if (j < canvasHeight / 2){
                    ratio = 0.85
                } else {
                    ratio = 0.15
                }
                if (p5.random(0,1) > ratio){
                    p5.line(x1, y1, x2, y2)
                } else {
                    p5.line(x1, y2, x2, y1)
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

