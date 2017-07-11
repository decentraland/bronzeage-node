import React from 'react'
import './Box.css'


export default function TilesBox() {
  return <div className="Box tiles">
    <h2>Tiles</h2>

    <div className="tile-content">
      <span id="js-tile-count"></span>
      <span id="js-transfer-tiles" className="hidden link">Transfer</span>
      <div id="js-tiles">Loading...</div>
    </div>
  </div>
}
