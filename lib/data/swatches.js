// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

const swatchDefinitions = [
  {slug: 'briefingPaleBlue', color: '#a4b4f8', name: 'Pale blue', codes: [0x02], isUsableIngame: false},
  {slug: 'briefingGreen', color: '#4cc428', name: 'Green', codes: [0x03], isUsableIngame: false},
  {slug: 'briefingLightGreen', color: '#b4fc74', name: 'Light green', codes: [0x04], isUsableIngame: false},
  {slug: 'briefingGray', color: '#585858', name: 'Gray', codes: [0x05], isUsableIngame: false},
  {slug: 'briefingWhite', color: '#ffffff', name: 'White', codes: [0x06], isUsableIngame: false},
  {slug: 'briefingRed', color: '#fc0000', name: 'Red', codes: [0x07], isUsableIngame: false},

  {slug: 'ingamePaleBlue', color: '#b8b8e8', name: 'Pale blue', codes: [0x02]},
  {slug: 'ingameYellow', color: '#dcdc3c', name: 'Yellow', codes: [0x03]},
  {slug: 'ingameWhite', color: '#ffffff', name: 'White', codes: [0x04]},
  {slug: 'ingameRed', color: '#c81818', name: 'Red', codes: [0x06]},
  {slug: 'ingameGreen', color: '#10fc18', name: 'Green', codes: [0x07]},
  {slug: 'ingameGray', color: '#847474', name: 'Gray', codes: [0x05]},

  // The following are player colors: all the ones with a 'codes' array are usable as in-game text message color.
  {slug: 'playerRed', color: '#f40404', name: 'Red', id: 0, codes: [0x08]},
  {slug: 'playerBlue', color: '#0c48cc', name: 'Blue', id: 1, codes: [0x0e]},
  {slug: 'playerTeal', color: '#2cb494', name: 'Teal', id: 2, codes: [0x0f]},
  {slug: 'playerPurple', color: '#88409c', name: 'Purple', id: 3, codes: [0x10]},
  {slug: 'playerOrange', color: '#f88c14', name: 'Orange', id: 4, codes: [0x11]},
  {slug: 'playerBrown', color: '#703014', name: 'Brown', id: 5, codes: [0x15]},
  {slug: 'playerWhite', color: '#cce0d0', name: 'White', id: 6, codes: [0x16]},
  {slug: 'playerYellow', color: '#fcfc38', name: 'Yellow', id: 7, codes: [0x17]},
  {slug: 'playerGreen', color: '#088008', name: 'Green', id: 8, codes: [0x18]},
  {slug: 'playerPaleYellow', color: '#fcfc7c', name: 'Pale yellow', id: 9, codes: [0x19]},
  {slug: 'playerTan', color: '#ecc4b0', name: 'Tan', id: 10, codes: [0x1b]},
  {slug: 'playerCerulean', color: '#4068d4', name: 'Cerulean', id: 11, isUnselectable: true, codes: [0x1c]}, // Used for neutral player.
  {slug: 'playerPaleGreen', color: '#74a47c', name: 'Pale green', id: 12, codes: [0x1d]},
  {slug: 'playerBluishGray', color: '#9090b8', name: 'Bluish gray', id: 13, codes: [0x1e]},
  {slug: 'playerTurquoise', color: '#00e4fc', name: 'Turquoise', id: 15, isUnselectable: true, codes: [0x1f]},
  {slug: 'playerPink', color: '#ffc4e4', name: 'Pink', id: 16},
  {slug: 'playerOlive', color: '#787800', name: 'Olive', id: 17},
  {slug: 'playerLime', color: '#d2f53c', name: 'Lime', id: 18},
  {slug: 'playerNavy', color: '#0000e6', name: 'Navy', id: 19},
  {slug: 'playerMagenta', color: '#f032e6', name: 'Magenta', id: 21},
  {slug: 'playerGray', color: '#808080', name: 'Gray', id: 22},
  {slug: 'playerBlack', color: '#3c3c3c', name: 'Black', id: 23},

  // The following player colors are unused and not selectable:
  {slug: 'playerPaleYellow2', color: '#fcfc7c', name: 'Pale yellow', id: 14, isUnused: true},
  {slug: 'playerCerulean2', color: '#4068d4', name: 'Cerulean', id: 20, isUnused: true}
]

module.exports = swatchDefinitions
