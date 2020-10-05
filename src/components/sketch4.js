import React, {useState} from "react";
import Sketch from "react-p5";


 
export default (props) => {

    let canvasWidth = props.canvasWidth;
    let canvasHeight = props.canvasHeight;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);  
        p5.background(255);
    };

    let count = 0
    let layers = 5 // amount of squares to overlap
    let gridSize = 10

    const draw = (p5) => {

        if (count < layers){
            // p5.background(255) // comment out to overlap squares

            // Re-usable function that draws a square of a given size, location, and randomness
            const drawSquare = (origin, size, randomness) => {
                // randomness = [0,10]
                let originX = origin[0] // left most boundary
                let originY = origin[1] // upper most boundary
                let outerX = originX + size // right most boundary
                let outerY = originY + size // down lowest boundary
                let randomRange = ((size/2)/10)*randomness
                
                // Upper left quadrant
                let x1 = p5.random(originX, (originX + randomRange));
                let y1 = p5.random(originY, originY + randomRange);
                
                // Upper right quadrant
                let x2 = p5.random(outerX - randomRange, outerX)
                let y2 = p5.random(originY, originY + randomRange);
                
                // Lower right quadrant
                let x3 = p5.random(outerX - randomRange, outerX)
                let y3 = p5.random((outerY - randomRange), outerY)
                
                // Lower left quadrant
                let x4 = p5.random(originX, originX + randomRange);
                let y4 = p5.random((outerY - randomRange), outerY)
    
                // Plot quadrilateral
                p5.stroke(0)
                // Uncomment to Plot Overlapping Lines
                p5.line(x1, y1, x2, y2)
                p5.line(x2, y2, x3, y3)
                p5.line(x3, y3, x4, y4)
                p5.line(x4, y4, x1, y1)

                // Uncomment to Plot solid shapes
                // p5.quad(x1, y1, x2, y2, x3, y3, x4, y4)
            }
    
    
    
            // Plot grid of squares
            let newOrigin = [0,0] // [x,y]
            let rowIt = 1
            let columnIt = 1
            let size = canvasWidth/gridSize
            for (let i = 0; i < gridSize*gridSize; i++){
                // drawSquare(newOrigin, size, rowIt-1)
                drawSquare(newOrigin, size, columnIt - 1)
                if (columnIt !== gridSize){
                    columnIt ++
                    newOrigin[0] += size
                } else {
                    columnIt = 1
                    newOrigin[0] = 0
                    newOrigin[1] += size
                    rowIt += 1
                }
            }
        }
        count ++      
    };
 
    return <Sketch setup={setup} draw={draw} />;
};

