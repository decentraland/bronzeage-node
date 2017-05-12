const stats = require('./stats')
const { bfs, logIt, resultJson, makeRpc, logError } = stats

function exploreTiles() {
  return bfs(tile => {
    makeRpc('isowntile', ['' + tile.x, '' + tile.y])
      .then(owned => {
        if (owned === 'true') {
          console.log(`\t${tile.x}, ${tile.y} owned -- current content is ${tile.content}`)
        }
      })
      .catch(logError)
  })
}

exploreTiles().catch(logError)
