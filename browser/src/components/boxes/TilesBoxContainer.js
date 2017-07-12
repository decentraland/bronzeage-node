import React from 'react'
import PropTypes from 'prop-types'
import im from 'immutable'

import { connect } from '../../store'
import { TilesModal } from '../modals'
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
      fetchTiles: actions.fetchTiles,
      openModal: actions.openModal
    }
  }

  static propTypes = {
    tiles  : PropTypes.instanceOf(im.List).isRequired,
    actions: PropTypes.object
  };

  componentWillMount() {
    this.props.actions.fetchTiles()
  }

  openTilesModal() {
    this.props.actions.openModal(TilesModal.MODAL_ID)
  }

  render() {
    const tiles = this.props.tiles

    return <div className="Box tiles">
      <h2>Tiles</h2>

      <div className="tile-content">
        <div>
          <TilesCount tiles={ tiles } />
          &nbsp;
          { !! tiles.size && <span className="link" onClick={ this.openTilesModal.bind(this) }>Transfer</span> }
        </div>

        <TileList tiles={ tiles } />
      </div>
    </div>
  }
}


export default connect(TilesBoxContainer)
