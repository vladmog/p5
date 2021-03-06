import React, {useState} from "react";
import Sketch from "react-p5";

// d: sin wave on each radial 
//    next radial is sin phase shift
 
export default (props) => {

    let canvasWidth

    const setup = (p5, canvasParentRef) => {
        canvasWidth = p5.windowWidth
        if(canvasWidth > 500) canvasWidth = 500
        canvasWidth -= 75
        p5.createCanvas(canvasWidth, canvasWidth).parent(canvasParentRef);  
        p5.background(255)
        p5.angleMode(p5.DEGREES)
    };

    let degrees = 0 //

    const draw = (p5) => {
        
    };


    const windowResized = (p5) => {
        canvasWidth = p5.windowWidth
        if(canvasWidth > 500) canvasWidth = 500
        canvasWidth -= 75
        p5.resizeCanvas(canvasWidth, canvasWidth);
    }
 
    return <Sketch setup={setup} draw={draw} />;
};

