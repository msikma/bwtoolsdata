// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

const {speedDefinitions} = require('../data')

/**
 * Converts a number of frames into milliseconds (per a game speed setting).
 */
const framesToMs = (frames, speed = 'fastest') => {
  if (frames == null) throw new TypeError(frames)
  return Math.round((frames / (1000 / speedDefinitions[speed])) * 1000)
}

module.exports = {
  framesToMs
}
