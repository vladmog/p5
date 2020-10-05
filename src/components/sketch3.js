import React, {useState} from "react";
import Sketch from "react-p5";


 
export default (props) => {

    let canvasWidth = props.canvasWidth;
    let canvasHeight = props.canvasHeight;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);  
        p5.background(255);
        p5.noLoop()
    };

    let count = 0
    let layers = 2 // amount of squares to overlap
    let gridSize = 10
    let steps = 3

    let x1
    let x2
    let x3
    let x4

    let y1
    let y2
    let y3
    let y4


    const draw = (p5) => {

        if (count < Infinity){
            p5.background(255) // comment out to overlap squares

            // Re-usable function that draws a square of a given size, location, and randomness
            const drawSquare = (origin, size, randomness) => {
                // randomness = [0,10]
                let originX = origin[0] // left most boundary
                let originY = origin[1] // upper most boundary
                let outerX = originX + size // right most boundary
                let outerY = originY + size // down lowest boundary
                let randomRange = ((size/2)/10)*randomness

                if(!x1) x1 = originX
                if(!x2) x2 = outerX
                if(!x3) x3 = outerX
                if(!x4) x4 = originX
                
                if(!y1) y1 = originY
                if(!y2) y2 = originY
                if(!y3) y3 = outerY
                if(!y4) y4 = outerY

                
                
                // Upper left quadrant
                let destinationX1 = p5.random(originX, (originX + randomRange));
                let destinationY1 = p5.random(originY, originY + randomRange);
                
                // x1 = destinationX1;
                // y1 = destinationY1;
                
                // Upper right quadrant
                let destinationX2 = p5.random(outerX - randomRange, outerX)
                let destinationY2 = p5.random(originY, originY + randomRange);

                // x2 = destinationX2
                // y2 = destinationY2
                
                // Lower right quadrant
                let destinationX3 = p5.random(outerX - randomRange, outerX)
                let destinationY3 = p5.random((outerY - randomRange), outerY)
                
                // x3 = destinationX3
                // y3 = destinationY3
                
                // Lower left quadrant
                let destinationX4 = p5.random(originX, originX + randomRange);
                let destinationY4 = p5.random((outerY - randomRange), outerY)
                
                // x4 = destinationX4
                // y4 = destinationY4

                // Define transitions = 


                const catalog = [
                    x1, destinationX1,
                    x2, destinationX2,
                    x3, destinationX3,
                    x4, destinationX4,
                    y1, destinationY1,
                    y2, destinationY2,
                    y3, destinationY3,
                    y4, destinationY4
                ]

                let stepsArr = [
                    [],[],[],[], // x1,x2,x3,x4
                    [],[],[],[] // y1,y2,y3,y4
                ]

                // [              i                    
                    // x1, dx1,   0,1    steps[0]        
                    // x2, dx2,   2,3    steps[1]
                    // x3, dx3,   4,5    steps[2]
                    // x4, dx4,   6,7    steps[3]    
                    // y1, dy1,   8,9    steps[4]  
                    // y2, dy2,   10,11  steps[5]    
                    // y3, dy3    12,13  steps[6]  
                    // y4, dy4    14,15  steps[7]   
                // ]



                // Define steps coordinates for transitions
                for (let i = 0; i < catalog.length; i+=2){
                    // find distance between x||y[i] and && destinationX||Y[i]
                    let curr = catalog[i]
                    let dest = catalog[i + 1]
                    let dist
                    let isIncreasing
                    if (curr > dest) {
                        dist = curr - dest
                        isIncreasing = false
                    } else {
                        dist = dest - curr
                        isIncreasing = true
                    }
                    // find interval = distance/steps
                    let interval = dist/steps
                    
                    // plot steps array
                    for (let j = 0; j < steps; j++){
                        if (isIncreasing){
                            stepsArr[i/2].push(curr + (interval*j))
                        } else {
                            stepsArr[i/2].push(curr - (interval*j))
                        }
                    }
                    
                }

                // Draw transitions
                for (let i = 1; i < steps; i++){
                    let x1Steps = stepsArr[0]
                    let x2Steps = stepsArr[1]
                    let x3Steps = stepsArr[2]
                    let x4Steps = stepsArr[3]
                    let y1Steps = stepsArr[4]
                    let y2Steps = stepsArr[5]
                    let y3Steps = stepsArr[6]
                    let y4Steps = stepsArr[7]

                    p5.quad(x1Steps[i], y1Steps[i], x2Steps[i], y2Steps[i], x3Steps[i], y3Steps[i], x4Steps[i], y4Steps[i])
                }

                x1 = destinationX1;
                y1 = destinationY1;
                x2 = destinationX2
                y2 = destinationY2
                x3 = destinationX3
                y3 = destinationY3
                x4 = destinationX4
                y4 = destinationY4

                

                // Plot quadrilateral
                p5.stroke(0)
                // Uncomment to Plot Overlapping Lines
                // p5.line(x1, y1, x2, y2)
                // p5.line(x2, y2, x3, y3)
                // p5.line(x3, y3, x4, y4)
                // p5.line(x4, y4, x1, y1)

                // Plot solid shapes
                p5.quad(x1, y1, x2, y2, x3, y3, x4, y4)

                x1 = undefined;
                y1 = undefined;
                x2 = undefined
                y2 = undefined
                x3 = undefined
                y3 = undefined
                x4 = undefined
                y4 = undefined
                
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

