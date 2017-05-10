const stats = require('./stats')

const getContentTiles = stats.getContentTiles

function countLand() {
  getContentTiles().catch(err => console.log(err, err.stack))
}

countLand()
