import React from "react";
import '../App.css'
import logo from '../assets/logo.svg'

function Welcome() {
  return (
    <div className="App">
      <header>
        <p className="site-name">M.Weather</p>
        <img id="site-icon" src={logo} alt="logo" />
      </header>
      <main>
        <input id="search" placeholder="Enter Zip Code or a City Name"></input>
        <button id="search-submit" onClick={""}>
          Show Weather
        </button>
      </main>
    </div>
  );
}

export default Welcome;
