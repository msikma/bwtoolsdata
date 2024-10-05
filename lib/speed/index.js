// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {speedDefinitions} from '../data/speed.js'

/**
 * Converts a number of frames into milliseconds (per a game speed setting).
 */
export const framesToMs = (frames, speed = 'fastest') => {
  if (frames == null) throw new TypeError(frames)
  return Math.round((frames / (1000 / speedDefinitions[speed])) * 1000)
}
