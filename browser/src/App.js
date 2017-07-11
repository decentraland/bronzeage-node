import React from 'react'
import Header from './Header'
import { MinerBox, StatsBox, TilesBox, RPCBox } from './boxes'
import './App.css'

class App extends React.Component {
  render() {
    return <div className="App container">
      <Header />

      <div className="row">
        <div className="col">
          <MinerBox />
        </div>

        <div className="col">
          <StatsBox />
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col">
          <TilesBox />
        </div>

        <div className="col">
          <RPCBox />
        </div>
      </div>
    </div>
  }
}

export default App
