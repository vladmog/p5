import React, {useState} from "react";
import Sketch from "react-p5";

// a: incremental
 
export default (props) => {

    let canvasWidth

    const setup = (p5, canvasParentRef) => {
        canvasWidth = p5.windowWidth
        if(canvasWidth > 500) canvasWidth = 500
        canvasWidth -= 75
        p5.createCanvas(canvasWidth, canvasWidth).parent(canvasParentRef);  
        p5.background(255)
        p5.angleMode(p5.DEGREES)
        p5.noLoop()
    };



    const draw = (p5) => {
        let degrees = 0 // iteratable
        let stepAroundProgress = 0
        let circleRadius = ((canvasWidth/2) - 30);
        console.log("circleRadius!!: ", circleRadius, canvasWidth)


        let layers = 20 // 15
        let gap = 0;
        let radialInterval = 10
        if (!layers) layers = p5.random(2,15)
        let quadSize = circleRadius/layers

        const drawSquare = (origin, size, randomScale, randomness) => {
            // randomness = [0,10]
            p5.push()
            let originX = origin[0] // left most boundary
            let originY = origin[1] // upper most boundary
            let outerX = originX + size // right most boundary
            let outerY = originY + size // down lowest boundary
            let randomRange = ((size/2)/randomScale)*randomness
            
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
            p5.pop()

            // Uncomment to Plot solid shapes
            // p5.quad(x1, y1, x2, y2, x3, y3, x4, y4)
        }


        p5.translate(canvasWidth/2,canvasWidth/2);
        for (let layer = 1; layer <= layers; layer++){
            let stepRadius = quadSize*layer+gap
            let stepCirc = p5.PI * 2 * stepRadius
            let circleStepCount = stepCirc / quadSize
            let rotationInterval = stepCirc/circleStepCount
            // while (degrees <= 359){
            while (circleStepCount < stepCirc){
                // console.log("SAP", layer)
                p5.push()
                p5.rotate(degrees)
                // p5.line(stepRadius,0,stepRadius,0);
                drawSquare([stepRadius, (0 - (quadSize/2))], quadSize, layers, layers - layer)
                degrees += rotationInterval
                circleStepCount += quadSize
                p5.pop()
            }
            degrees = 0    
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

