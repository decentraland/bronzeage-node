import React from 'react'
import PropTypes from 'prop-types'
import im from 'immutable'
import StatsTable from './StatsTable'
import './Box.css'


export default function StatsBox({ blockchain, miner }) {
  return <div className="Box node-stats">
    <h2>Stats</h2>

    <div>
      <StatsTable blockchain={ blockchain } hashrate={ miner.get('hashrate') } />
    </div>
  </div>
}

StatsBox.propTypes = {
  blockchain: PropTypes.instanceOf(im.Map),
  miner     : PropTypes.instanceOf(im.Map)
}
