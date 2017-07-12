
export default class Tile {
  constructor(tile) {
    this.tile = tile
  }

  hasContent() {
    return this.tile.get('content').replace(/0/g, '')
  }

  getURL() {
    const { x, y } = this.tile.toJS()
    return `https://decentraland.org/app/?x=${x}&y=${y}`
  }
}
