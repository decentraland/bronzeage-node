import React from 'react'
import PropTypes from 'prop-types'

import { connect } from '../../store'
import Toggle from '../Toggle'


class MinerContainer extends React.Component {
  static getState(state) {
    return {
      running: state.getIn([ 'stats', 'minerinfo', 'running' ])
    }
  }

  static getActions(actions) {
    return {
      getMiner: actions.getMiner
    }
  }

  static propTypes = {
    running: PropTypes.object.boolean
  };

  componentWillMount() {
    // fetchMiner()
  }

  render() {
    const running = this.props.running

    return <Toggle active={ running } />
  }
}


export default connect(MinerContainer)
