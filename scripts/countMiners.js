const stats = require('./stats')

const getMiningAddresses = stats.getMiningAddresses

function countMiners() {
  getMiningAddresses().then(minerAddresses => {
    console.log('There are', Object.keys(minerAddresses).length, 'miners')
  }).catch(err => {
    console.log(err, err.stack)
  })
}

countMiners()
