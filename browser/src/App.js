import React from 'react'
import Header from './components/Header'
import InfoRowContainer from './components/InfoRowContainer'
import { TilesBox, RPCBox } from './components/boxes'
import './App.css'


class App extends React.Component {
  render() {
    return <div className="App container">
      <Header />

      <InfoRowContainer />

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
