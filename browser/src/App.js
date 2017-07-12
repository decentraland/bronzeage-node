import React from 'react'
import Header from './components/Header'
import { MinerBoxContainer, StatsBoxContainer, TilesBox, RPCBox } from './components/boxes'
import './App.css'


class App extends React.Component {
  render() {
    return <div className="App container">
      <Header />

      <div className="row">
        <div className="col">
          <MinerBoxContainer />
        </div>

        <div className="col">
          <StatsBoxContainer />
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
