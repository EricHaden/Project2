import React from 'react'
import './Title.css';

function Title() {
  return (
    <header className="Header">
      <h1 className="Header-title">ROCK-PAPER-SCISSORS</h1>
      <div className="Header-buttons">
        <button className="Header-button">Capture Photo</button>
        <button className="Header-button">Button 2</button>
      </div>
    </header>
  );
}

export default Title