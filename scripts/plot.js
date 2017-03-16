var fs = require('fs')
var randomcolor = require('randomcolor')

var c = fs.readFileSync('/dev/stdin').toString()
var f = JSON.parse(c)

var colormap = {}

f.sort(function(a, b) {
  return Math.abs(a.x) + Math.abs(a.y) - (Math.abs(b.x) + Math.abs(b.y))
})

console.log(`
  <html>
  <head>
  <style>
    html, head, body {
      margin: 0;
      padding: 0;
      display: block;
    }
    .tiles { position: absolute; display: block; width: 10px; height: 10px; }
    .canvas { position: absolute; top: 500px; left: 500px; width: 100%; height: 100%; }
  </style>
  </head>
  <body>
  <div class="canvas">
`)
for (let i in f) {
  const y = f[i]
  const color = colormap[y.address] || (colormap[y.address] = randomcolor())
  console.log(`<div class="tiles" style="left: ${y.x * 10}px; top: ${y.y * 10}px; background-color: ${color}"></div>`);
}
console.log(`
  </div>
  </body>
  </html>
`)
