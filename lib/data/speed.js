// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

/**
 * Number of milliseconds per game frame for each game speed.
 * 
 * For 'fastest', there are approximately 1000 / 42 = ~23.81 frames in a second.
 * This is used to convert the number of game frames into real time.
 */
export const speedDefinitions = {
  slowest: 167,
  slower: 111,
  slow: 83,
  normal: 67,
  fast: 56,
  faster: 48,
  fastest: 42
}
