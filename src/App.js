import React from "react";
import styled from "styled-components";
// import './App.css';
import useWindowDimensions from "./hooks/useWindowDimensions";
import Sketch from "./components/sketch1";
import Sketch1 from "./components/sketch1";
import Sketch2 from "./components/sketch2";
import Sketch3 from "./components/sketch3";
import Sketch4 from "./components/sketch4";
import Sketch5 from "./components/sketch5";
import Sketch5b from "./components/sketch5b";
import Sketch9 from "./components/sketch9";
import Sketch10 from "./components/sketch10";
import Sketch11 from "./components/sketch11";

const S = {};

S.Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: "Poppins", sans-serif;
	box-sizing: border-box;
	width: 100vw;
	text-align: left;
`;

S.Header = styled.header`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;

	.intro {
		margin-top: 15vh;
		box-shadow: none;
		.title {
			align-self: flex-start;
			margin-left: 0px;
			margin-bottom: 0px;
			font-size: 32px;
		}
		.descript {
			align-self: flex-start;
			margin-left: 0px;
		}
		h4 {
			align-self: flex-start;
			font-weight: 200;
			margin-left: 0px;
			margin-top: 0px;
			font-size: 15px;
		}
	}

	section {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		max-width: 500px;
		background-color: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 5px 5px 100px #e6e6e6;
		margin-top: 4vh;
		margin-bottom: 4vh;
		width: 95%;

		h1 {
			align-self: flex-start;
		}

		h2 {
			align-self: flex-start;
		}

		p {
			margin-top: 1vh;
		}

		.code {
			margin: 3vh 0px 1vh 0px;
			align-self: center;
		}

		.react-p5 {
			align-self: center;
			// display: none;
		}
	}
`;

function App() {
	const { height, width } = useWindowDimensions();

	let displayWidth = width - 50;
	let cap = 450;
	if (width > cap) displayWidth = cap;
	return (
		<S.Container>
			<S.Header>
				<section className="intro">
					<h1 className="title">GENERATIVE ART STUDY</h1>
					<h4>
						by{" "}
						<a href="https://vladmog.com/">Vladislav Mogilevskiy</a>
					</h4>
					<div className="descript">
						Experiments in algorithmically generated art via{" "}
						<a href="https://p5js.org/">p5.js</a>.
					</div>
				</section>
				<section>
					<a
						className="code"
						href="https://github.com/vladmog/p5/blob/master/src/components/sketch10.js"
					>
						Nested variable circles: Code
					</a>
					<Sketch11 />
				</section>
				<section>
					<a
						className="code"
						href="https://github.com/vladmog/p5/blob/master/src/components/sketch10.js"
					>
						Nested circles: Code
					</a>
					<Sketch10 />
				</section>
				{/* <h2>Day 1</h2>
        <h3>First animation</h3>
        <a href = "https://github.com/vladmog/p5/blob/master/src/components/day1.js">Code</a>
        <Sketch1 />
        
        <h2>Day 2</h2> */}
				<section>
					<a
						className="code"
						href="https://github.com/vladmog/p5/blob/master/src/components/sketch9.js"
					>
						10PRINT: Code
					</a>
					<Sketch9 />
				</section>
				<section>
					<h2>
						<a href="https://en.wikipedia.org/wiki/Vera_Moln%C3%A1r">
							Vera Molnár
						</a>{" "}
						Study: <br />
						Structure de Quadrilateres
					</h2>
					<p>
						Algorithms aiming to replicate the 1980s studies of
						quadrilateral generation by Vera Molnár.{" "}
					</p>
					{/* <p>Quadrilaterals generated with increasing degrees of irregularity. Stacked differently in each sample.</p> */}
					<p>Each loading of page generates unique result.</p>
					<a href="https://www.google.com/search?q=Structure+de+Quadrilateres&tbm=isch&ved=2ahUKEwjztfWE-pzsAhX6KjQIHdEaCuAQ2-cCegQIABAA&oq=Structure+de+Quadrilateres&gs_lcp=CgNpbWcQA1AAWABgxzFoAHAAeACAAQCIAQCSAQCYAQCqAQtnd3Mtd2l6LWltZw&sclient=img&ei=cs56X_O0CfrV0PEP0bWogA4&bih=801&biw=1422&rlz=1C5CHFA_enUS906US906">
						Inspiration
					</a>
					<a
						className="code"
						href="https://github.com/vladmog/p5/blob/master/src/components/sketch4.js"
					>
						Chaos shapes: Code
					</a>
					<Sketch4 />
					<a
						className="code"
						href="https://github.com/vladmog/p5/blob/master/src/components/sketch2.js"
					>
						Stacked shapes: Code
					</a>
					<Sketch2 />
					<a
						className="code"
						href="https://github.com/vladmog/p5/blob/master/src/components/sketch3.js"
					>
						Nested shapes: Code
					</a>
					<Sketch3 />
					<a
						className="code"
						href="https://github.com/vladmog/p5/blob/master/src/components/sketch5.js"
					>
						Radial: Code
					</a>
					<Sketch5 />
					<a
						className="code"
						href="https://github.com/vladmog/p5/blob/master/src/components/sketch5b.js"
					>
						Radial Molnár: Code
					</a>
					<Sketch5b />
				</section>
			</S.Header>
		</S.Container>
	);
}

export default App;
