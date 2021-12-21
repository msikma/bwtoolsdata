// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

/**
 * Number of game frames per second for each game speed.
 * 
 * This makes it possible to convert game frames to real time. By far most games are played on 'fastest'.
 */
const speedDefinitions = {
  slowest: 5.99,
  slower: 9.01,
  slow: 12.05,
  normal: 14.93,
  fast: 17.86,
  faster: 20.83,
  fastest: 23.8122905028
}

module.exports = {
  speedDefinitions
}
