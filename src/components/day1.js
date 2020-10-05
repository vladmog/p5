import React, {useState} from "react";
import Sketch from "react-p5";
 
export default (props) => {

 
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 500).parent(canvasParentRef);   
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
            let gap = 500/length;
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
        let u = 100
        let l = 0
        let length = 500/3
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
        //     p5.line(250,i*gap+modifier,500,i*gap)
        // }




   
    };
 
    return <Sketch setup={setup} draw={draw} />;
};