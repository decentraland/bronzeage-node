import React from 'react'
import PropTypes from 'prop-types'
import im from 'immutable'

import { connect } from '../../store'
import TilesCount from './TilesCount'
import TileList from './TileList'
import './Box.css'


class TilesBoxContainer extends React.Component {
  static getState(state) {
    return {
      tiles: state.get('tiles')
    }
  }

  static getActions(actions) {
    return {
      fetchTiles: actions.fetchTiles
    }
  }

  static propTypes = {
    tiles  : PropTypes.instanceOf(im.List).isRequired,
    actions: PropTypes.object
  };

  componentWillMount() {
    this.props.actions.fetchTiles()
  }

  render() {
    const tiles = this.props.tiles

    return <div className="Box tiles">
      <h2>Tiles</h2>

      <div className="tile-content">
        <TilesCount tiles={ tiles } />
        <span id="js-transfer-tiles" className="hidden link">Transfer</span>
        <TileList tiles={ tiles } />
      </div>
    </div>
  }
}


export default connect(TilesBoxContainer)
