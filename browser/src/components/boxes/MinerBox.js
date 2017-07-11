import React from 'react'
import PropTypes from 'prop-types'
import Toggle from '../Toggle'
import './Box.css'


export default function MinerBox({ running }) {
  return <div className="Box miner">
    <h2>Miner</h2>

    <div>
      <Toggle active={ running } />
    </div>
  </div>
}

MinerBox.propTypes = {
  running: PropTypes.object.boolean
}
