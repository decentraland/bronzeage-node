;(function() {
  'use strict';

  fetch('/gettiles?param=1').then(function(response) {
    if (response.status === 200) {
      response.json()
        .then(function(tiles) {
          var baseURL = "https://decentraland.org/app/?";
          var tilesHTML = '';

          tiles
            .sort(function(a, b) { return Math.abs(a.x) - Math.abs(b.x) })
            .forEach(function(tile) {
              // Concat here instead of using a `.join()` to avoid yet another iteration
              var url = baseURL + 'x=' + tile.x + '&y=' + tile.y;
              var content = '(' + tile.x + ', ' + tile.y + ') ' + tile.content;

              tilesHTML += '<li><a href="' + url + '" target="_blank">' + content + '<a></li>';
            });

          document.getElementById('js-loading-tiles').className = 'hidden';
          document.getElementById('js-tile-count').innerHTML = '(' + tiles.length + ')';
          document.getElementById('js-tiles').innerHTML = tilesHTML;
        });
    } else {
      response.text().then(error => console.log('ERROR', error));
    }
  })
  .catch(function(error) {
    console.log('ERROR fething', error);
  })
})();
