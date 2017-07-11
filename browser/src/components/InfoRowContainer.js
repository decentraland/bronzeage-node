import React from 'react'
import PropTypes from 'prop-types'

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
      getStats: actions.getStats
    }
  }

  static propTypes = {
    stats: PropTypes.object.isRequired
  };

  componentWillMount() {
    // fetchStats()
  }

  render() {
    const blockchaininfo = this.props.stats.get('blockchaininfo')
    const minerinfo = this.props.stats.get('minerinfo')

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
