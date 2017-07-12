import React from 'react'
import PropTypes from 'prop-types'
import im from 'immutable'

import Tiles from '../../lib/Tiles'
import Tile from '../../lib/Tile'


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
  const tileInstance = new Tile(tile)
  const contentText = tileInstance.hasContent() ? 'Click to see content' : 'Empty'

  return <li>
    <a href={ tileInstance.getURL() } target="_blank">({ tile.get('x') }, { tile.get('y') }): { contentText }</a>
  </li>
}

TileItem.propTypes = {
  tile: PropTypes.instanceOf(im.Map).isRequired
}
