import React, {useState} from "react";
import Sketch from "react-p5";
 
export default (props) => {
    const [x, setX] = useState(100);
    const [y, setY] = useState(100);
    let size = 70
    let xx = x;
    let yy = y;
    // const [size, setSize] = useState(70)

    let canvasWidth = props.canvasWidth;
    let canvasHeight = props.canvasHeight;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);  
        
    };
 
    const draw = (p5) => {
        p5.background(60);
        // p5.ellipse(xx, yy, size, size);
        size ++;
        xx ++;
        yy ++;
    };
 
    return <Sketch setup={setup} draw={draw} />;
};