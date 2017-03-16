var fs = require('fs')

var c = fs.readFileSync('/dev/stdin').toString()
var d = JSON.parse(c)
var e = d.result
var f = JSON.parse(e)

f.sort(function(a, b) {
  return Math.abs(a.x) + Math.abs(a.y) - (Math.abs(b.x) + Math.abs(b.y))
})

console.log('Controlled tiles:')
for (let i in f) {
  const y = f[i]
  console.log(y.x, y.y, y.content)
}
console.log(f.length)
