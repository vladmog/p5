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
        <h1>p5.js experimentation</h1>
        <h2>Day 1</h2>
        <h3>First animation</h3>
        <a href = "https://github.com/vladmog/p5/blob/master/src/components/day1.js">Code</a>
        <Sketch1 canvasWidth = {displayWidth} canvasHeight = {displayWidth} />
        
        <h2>Day 2</h2>
        <h3>
          <a href = "https://en.wikipedia.org/wiki/Vera_Moln%C3%A1r">Vera Molnár</a> Study: Structure de Quadrilateres
        </h3>
        <span>Generates unique image on each loading/reloading of page</span>
        <a href = "https://www.google.com/search?q=Structure+de+Quadrilateres&rlz=1C5CHFA_enUS906US906&sxsrf=ALeKk03OJbHl0234HwdPYZtSDsuHa7MmtA:1601866577357&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiMmMiCupzsAhXjGjQIHTHDAlsQ_AUoAXoECAsQAw&biw=1422&bih=801#imgrc=996Xl7KGglNRnM">Inspo</a>
        <a href = "https://github.com/vladmog/p5/blob/master/src/components/day2.js">Code</a>
        {/* <Sketch2 canvasWidth = {displayWidth} canvasHeight = {displayWidth} /> */}
        <Sketch4 canvasWidth = {displayWidth} canvasHeight = {displayWidth} />
        {/* <Sketch3 canvasWidth = {displayWidth} canvasHeight = {displayWidth} /> */}
      </header>
    </div>
  );
}

export default App;
