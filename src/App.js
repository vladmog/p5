import React from 'react';
import './App.css';
import useWindowDimensions from './hooks/useWindowDimensions';
import Sketch from "./components/sketch1";
import Sketch1 from "./components/sketch1";
import Sketch2 from "./components/sketch2";
import Sketch3 from "./components/sketch3";
import Sketch4 from "./components/sketch4";


function App() {

const { height, width } = useWindowDimensions();



let displayWidth = width - 50;
let cap = 450
if (width > cap) displayWidth = cap
  return (
    <div className="App">
      <header className="App-header">
        <h1><a href = "https://p5js.org/">p5.js</a> experimentation</h1>
        {/* <h2>Day 1</h2>
        <h3>First animation</h3>
        <a href = "https://github.com/vladmog/p5/blob/master/src/components/day1.js">Code</a>
        <Sketch1 />
        
        <h2>Day 2</h2> */}
        <h3>
          <a href = "https://en.wikipedia.org/wiki/Vera_Moln%C3%A1r">Vera Molnár</a> Study: Structure de Quadrilateres
        </h3>
        <span>Algorithmically generates unique image on each loading/reloading of page</span>
        <a href = "https://www.google.com/search?q=Structure+de+Quadrilateres&tbm=isch&ved=2ahUKEwjztfWE-pzsAhX6KjQIHdEaCuAQ2-cCegQIABAA&oq=Structure+de+Quadrilateres&gs_lcp=CgNpbWcQA1AAWABgxzFoAHAAeACAAQCIAQCSAQCYAQCqAQtnd3Mtd2l6LWltZw&sclient=img&ei=cs56X_O0CfrV0PEP0bWogA4&bih=801&biw=1422&rlz=1C5CHFA_enUS906US906">Inspo</a>
        <a href = "https://github.com/vladmog/p5/blob/master/src/components/sketch2.js">Stacked shapes: Code</a>
        <Sketch2 />
        <a href = "https://github.com/vladmog/p5/blob/master/src/components/sketch4.js">Chaos shapes: Code</a>
        <Sketch4 />
        <a href = "https://github.com/vladmog/p5/blob/master/src/components/sketch3.js">Nested shapes: Code</a>
        <Sketch3 />
      </header>
    </div>
  );
}

export default App;
