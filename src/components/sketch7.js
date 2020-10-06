import React, {useState} from "react";
import Sketch from "react-p5";

// c: decreasing quad size away from center
 
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

    let degrees = 0 // iteratable
    let circleRadius = 200;
    let layers = 30
    let quadSize = circleRadius/layers

    const draw = (p5) => {
        p5.translate(canvasWidth/2,canvasWidth/2);
        for (let layer = 1; layer <= layers; layer++){
            let stepRadius = quadSize*layer
            while (degrees <= 360){
                p5.push()
                p5.rotate(degrees)
                p5.line(stepRadius,0,stepRadius,0);
                degrees += 1
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

