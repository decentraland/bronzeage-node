import React from 'react'
import PropTypes from 'prop-types'
import im from 'immutable'

import { connect } from '../store'
import { MinerBox, StatsBox } from './boxes'


class InfoRowContainer extends React.Component {
  static getState(state) {
    return {
      stats: state.get('stats')
    }
  }

  static getActions(actions) {
    return {
      fetchStats: actions.fetchStats
    }
  }

  static propTypes = {
    stats  : PropTypes.object.isRequired,
    actions: PropTypes.object
  };

  componentWillMount() {
    this.props.actions.fetchStats()
  }

  render() {
    console.log('stats', this.props.stats)
    const stats = this.props.stats || im.Map()

    const blockchaininfo = stats.get('blockchaininfo')
    const minerinfo = stats.get('minerinfo')

    return <div className="row">
      <div className="col">
        <MinerBox running={ minerinfo.get('running') } />
      </div>

      <div className="col">
        <StatsBox blockchain={ blockchaininfo } miner={ minerinfo } />
      </div>
    </div>
  }
}


export default connect(InfoRowContainer)
