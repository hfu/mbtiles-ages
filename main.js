// const tilebelt = require('@mapbox/tilebelt')
const distanceInWordsToNow = require('date-fns/distance_in_words_to_now')

const main = () => {
  map.addControl(new mapboxgl.NavigationControl())
  fetch('mtime.json')
    .then(response => { return response.json() })
    .then(json => {
      map.addLayer({
        id: 'age-line',
        type: 'line',
        source: {
          type: 'vector',
          tiles: ['https://hfu.github.io/6/{z}/{x}/{y}.pbf'],
          minzoom: 0,
          maxzoom: 6
        },
        'source-layer': '6',
        layout: {
        },
        paint: {
          'line-color': '#444'
        }
      })
      let expression = [
        'match',
        ['get', 'w3n']
      ]
      for (let w3n of Object.keys(json)) {
        expression.push(w3n)
        expression.push(distanceInWordsToNow(new Date(json[w3n])) + ' ago')
      }
      expression.push('unknown')
      map.addLayer({
        id: 'age-text',
        type: 'symbol',
        source: {
          type: 'vector',
          tiles: ['https://hfu.github.io/6/{z}/{x}/{y}.pbf'],
          minzoom: 2,
          maxzoom: 6
        },
        'source-layer': '6',
        layout: {
          'text-field': expression,
          'text-font': ['sans'],
          'text-max-width': 4,
          'text-size': [
            'interpolate', 
            ['exponential', 2],
            ['zoom'],
            2, 6, 10, 512 
          ]
        },
        paint: {
          'text-color': '#444'
        }
      })
    })
}

const map = new mapboxgl.Map({
  container: 'map', style: '../style.json', zoom: 2.83, center: [22.21, 3.33],
  attributionControl: true, hash: true
})
map.on('load', main)


