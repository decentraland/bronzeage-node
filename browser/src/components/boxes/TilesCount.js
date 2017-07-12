import React from 'react'
import PropTypes from 'prop-types'
import im from 'immutable'

import Tiles from '../../lib/Tiles'


export default function TilesCount({ tiles }) {
  const contentCount = new Tiles(tiles).countContent()
  const emptyCount = tiles.size - contentCount

  return <div>
    You have { contentCount } tiles with content and { emptyCount } empty ones for a total of { tiles.size } tiles.
  </div>
}

TilesCount.propTypes = {
  tiles: PropTypes.instanceOf(im.List)
}

TilesCount.defaultProps = {
  tiles: im.List()
}
