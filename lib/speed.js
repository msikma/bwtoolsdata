// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

const {speedDefinitions} = require('./data/speed')

/**
 * Converts a number of frames into milliseconds (per a game speed setting).
 */
const framesToMs = (frames, speed = 'fastest') => {
  return Math.round((frames / speedDefinitions[speed]) * 1000)
}

module.exports = {
  framesToMs
}
