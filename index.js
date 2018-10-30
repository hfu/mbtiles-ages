const config = require('config')
const fs = require('fs')
const z = config.get('z')

const getAges = () => {
  let json = {}
  for (let x = 0; x < 2 ** z; x++) {
    for (let y = 0; y < 2 ** z; y++) {
      const w3n = `${z}-${x}-${y}`
      const path = `${config.get('mbtiles')}/${w3n}.mbtiles`
      json[w3n] = fs.statSync(path).mtime.getTime()
    }
  }
  return json
}

fs.writeFileSync(config.get('dst'), JSON.stringify(getAges(), null, 2))
