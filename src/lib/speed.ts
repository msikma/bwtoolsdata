// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

/**
 * Converts a number of frames into milliseconds.
 * 
 * Takes a frames count and a number of ms per frame.
 */
export const framesToMs = (frames: number, msPerFrame: number): number => {
  if (frames == null) {
    throw new Error('Frames argument missing')
  }
  if (msPerFrame == null || msPerFrame === 0) {
    throw new Error('Invalid msPerFrame number')
  }
  return Math.round((frames / (1000 / msPerFrame)) * 1000)
}
