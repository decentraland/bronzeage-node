import React from 'react'
import PropTypes from 'prop-types'

import { connect } from '../../store'
import StatsTable from './StatsTable'


class StatsContainer extends React.Component {
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

    return <StatsTable blockchain={ blockchaininfo } hashrate={ minerinfo.get('hashrate') } />
  }
}


export default connect(StatsContainer)
