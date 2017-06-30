const stats = require('./stats')

const getContentTiles = stats.getContentTiles

function countLand() {
  getContentTiles().then(e => console.log(e)).catch(err => console.log(err, err.stack))
}

countLand()
