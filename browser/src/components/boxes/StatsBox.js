import React from 'react'
import StatsContainer from './StatsContainer'
import './Box.css'


export default function StatsBox() {
  return <div className="Box node-stats">
    <h2>Stats</h2>

    <div>
      <StatsContainer />
    </div>
  </div>
}
