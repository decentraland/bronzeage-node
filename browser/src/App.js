import React from 'react'
import Header from './components/Header'
import { MinerBoxContainer, StatsBoxContainer, TilesBoxContainer, RPCBoxContainer } from './components/boxes'
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
          <TilesBoxContainer />
        </div>

        <div className="col">
          <RPCBoxContainer />
        </div>
      </div>
    </div>
  }
}

export default App
