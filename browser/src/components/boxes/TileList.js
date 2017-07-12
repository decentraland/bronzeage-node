import React from 'react'
import PropTypes from 'prop-types'
import im from 'immutable'

import Tiles from '../../lib/Tiles'
import TileLink from '../TileLink'


export default function TileList({ tiles }) {
  tiles = new Tiles(tiles).sortByContent()

  return <ul className="input scrolleable">
    { tiles.map((tile, index) => <TileItem key={ index } tile={ tile } />).toArray() }
  </ul>
}

TileList.propTypes = {
  tiles: PropTypes.instanceOf(im.List)
}

TileList.defaultProps = {
  tiles: im.List()
}


function TileItem({ tile }) {
  return <li>
    <TileLink tile={ tile } />
  </li>
}

TileItem.propTypes = {
  tile: PropTypes.instanceOf(im.Map).isRequired
}
