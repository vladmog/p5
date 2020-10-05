import React, {useState} from "react";
import Sketch from "react-p5";
 
export default (props) => {

    let canvasWidth

    const setup = (p5, canvasParentRef) => {
        canvasWidth = p5.windowWidth
        if(canvasWidth > 500) canvasWidth = 500
        canvasWidth -= 50
        p5.createCanvas(canvasWidth, canvasWidth).parent(canvasParentRef);  

        
    };

    let pulse = 2;
    let isPulseIncreasing = true;
    let pulseRange = [1, 120]
    
    const draw = (p5) => {
        let speed = 1;
        let count =20;
        p5.background(255);

        // Creates a line box
        const createBox = (u, l, length) => {
            let gap = canvasWidth/length;
            let r = l + length
            for (let i = 0; i < count; i ++){
                let modifier
                if (i%2 === 0){
                    modifier = pulse
                    // modifier = 0
                } else {
                    modifier = -pulse
                }
                p5.line(
                    l,
                    (u + (i*gap)),
                    ((r+l)/2),
                    (u + (i*gap)) + modifier,
                )
                p5.line(
                    ((r+l)/2),
                    (u + (i*gap))+modifier,
                    r,
                    (u + (i*gap))
                )
            }
        }

        // Create grid of line boxes
        let u = 80
        let l = 0
        let length = canvasWidth/3
        for (let i = 0; i < 9; i++){
            createBox(u, l, length)
            l += length
            if ((i+1)%3 === 0){
                u += length - 50
                l = 0
            }
        }

        // Control growth and shrink during pulse phases
        if (isPulseIncreasing){
            pulse += speed
        } else {
            pulse -= speed
        }
        
        // Alternate growth and shrink to create pulse
        if (isPulseIncreasing && pulse > pulseRange[1]){
            isPulseIncreasing = false
        }
        if (!isPulseIncreasing && pulse < pulseRange[0]){
            isPulseIncreasing = true
        }

        

        // for (let i = 0; i < count; i ++){
        //     let modifier
        //     if (i%2 === 0){
        //         modifier = pulse
        //     } else {
        //         modifier = -pulse
        //     }
        //     p5.line(0,i*gap,250,i*gap + modifier)
        //     p5.line(250,i*gap+modifier,canvasWidth,i*gap)
        // }




   
    };


    const windowResized = (p5) => {
        canvasWidth = p5.windowWidth
        if(canvasWidth > 500) canvasWidth = 500
        canvasWidth -= 50
        p5.resizeCanvas(canvasWidth, canvasWidth);
    }
 
    return <Sketch setup={setup} draw={draw} />;
};