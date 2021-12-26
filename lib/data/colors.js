// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

/**
 * List of color control codes and definitions.
 * 
 * This lists all the colors used in StarCraft for the purposes of displaying text messages.
 */
const colorDefinitions = {
  /** Color definitions for briefing text. */
  briefingMessage: {
    // Default colors (changed to white since StarCraft: Remastered).
    defaultColor: {
      bw: 'paleBlue',
      r: 'white'
    },
    // Text style control codes.
    specialCodes: [
      {codes: [0x0B, 0x14], type: 'INVISIBLE', onlyWorksInBW: true},
      {codes: [0x12], type: 'RIGHT_ALIGN'}, // In SCMDraft: <R>
      {codes: [0x13], type: 'CENTER_ALIGN'}, // In SCMDraft: <C>
      {codes: [0x01, 0x0D, 0x1A], type: 'NO_OP'}
    ],
    // Control codes used to switch text color to a swatch.
    codes: {
      'paleBlue': [0x02],
      'green': [0x03],
      'lightGreen': [0x04],
      'gray': [0x05],
      'white': [0x06],
      'red': [0x07]
    },
    // Hex color values for each swatch.
    swatches: {
      'paleBlue': '#a4b4f8',
      'green': '#4cc428',
      'lightGreen': '#b4fc74',
      'gray': '#585858',
      'white': '#ffffff',
      'red': '#fc0000'
    },
    // Descriptive names for each swatch for display purposes.
    swatchNames: {
      'paleBlue': 'Pale blue',
      'green': 'Green',
      'lightGreen': 'Light green',
      'gray': 'Gray',
      'white': 'White',
      'red': 'Red'
    },
    // Mapping between swatches and player IDs. Only applicable to text message colors.
    swatchIDs: {
      'paleBlue': null,
      'green': null,
      'lightGreen': null,
      'gray': null,
      'white': null,
      'red': null
    }
  },
  /** Color definitions for text messages that appear in-game. */
  textMessage: {
    // Default colors; 'text' for in-game text lines printed by the map, 'chat' for player chat lines.
    defaultColor: {
      text: {
        bw: 'paleBlue',
        r: 'paleBlue'
      },
      chat: {
        bw: 'green',
        r: 'green'
      },
    },
    // Text style control codes.
    specialCodes: [
      {codes: [0x0B, 0x14], type: 'INVISIBLE', onlyWorksInBW: false},
      {codes: [0x12], type: 'RIGHT_ALIGN'},
      {codes: [0x13], type: 'CENTER_ALIGN'},
      {codes: [0x01, 0x0C, 0x1A], type: 'NO_OP'}
    ],
    // Control codes used to switch text color to a swatch.
    codes: {
      'paleBlue': [0x02],
      'yellow': [0x03],
      'white': [0x04],
      'gray': [0x05],
      'red': [0x06],
      'green': [0x07],
      'grayGreen': [0x1D],
      'blueGray': [0x1E],
      'turquoise': [0x1F],
      
      'redP1': [0x08],
      'blueP2': [0x0E],
      'tealP3': [0x0F],
      'purpleP4': [0x10],
      'orangeP5': [0x11],
      'brownP6': [0x15],
      'whiteP7': [0x16],
      'yellowP8': [0x17],
      'greenP9': [0x18],
      'brightYellowP10': [0x19],
      'pinkP11': [0x1B],
      'ceruleanP12': [0x1C]
    },
    // Hex color values for each swatch.
    swatches: {
      'paleBlue': '#b8b8e8',
      'yellow': '#dcdc3c',
      'white': '#ffffff',
      'red': '#c81818',
      'green': '#10fc18',
      'gray': '#847474',
      'grayGreen': '#74a47c',
      'blueGray': '#9090b8',
      'turquoise': '#00e4fc',
      
      'redP1': '#f40404',
      'blueP2': '#0c48cc',
      'tealP3': '#2cb494',
      'purpleP4': '#88409c',
      'orangeP5': '#f88c14',
      'brownP6': '#703014',
      'whiteP7': '#cce0d0',
      'yellowP8': '#fcfc38',
      'greenP9': '#088008',
      'brightYellowP10': '#fcfc7c', // Called 'brighter yellow' in SCMDraft.
      'pinkP11': '#ecc4b0', // Called 'pinkish' in SCMDraft.
      'ceruleanP12': '#4068d4' // Called 'dark cyan' in SCMDraft.
    },
    // Descriptive names for each swatch for display purposes.
    swatchNames: {
      'paleBlue': 'Pale blue',
      'yellow': 'Yellow',
      'white': 'White',
      'red': 'Red',
      'green': 'Green',
      'gray': 'Gray',
      'grayGreen': 'Gray green',
      'blueGray': 'Blue gray',
      'turquoise': 'Turquoise',
      
      'redP1': 'Red (Player 1)',
      'blueP2': 'Blue (Player 2)',
      'tealP3': 'Teal (Player 3)',
      'purpleP4': 'Purple (Player 4)',
      'orangeP5': 'Orange (Player 5)',
      'brownP6': 'Brown (Player 6)',
      'whiteP7': 'White (Player 7)',
      'yellowP8': 'Yellow (Player 8)',
      'greenP9': 'Green (Player 9)',
      'brightYellowP10': 'Bright yellow (Player 10)',
      'pinkP11': 'Pink (Player 11)',
      'ceruleanP12': 'Cerulean (Player 12)'
    },
    // Mapping between swatches and player IDs.
    swatchIDs: {
      'paleBlue': null,
      'yellow': null,
      'white': null,
      'red': null,
      'green': null,
      'gray': null,
      'grayGreen': null,
      'blueGray': null,
      'turquoise': null,

      'redP1': 0,
      'blueP2': 1,
      'tealP3': 2,
      'purpleP4': 3,
      'orangeP5': 4,
      'brownP6': 5,
      'whiteP7': 6,
      'yellowP8': 7,
      'greenP9': 8,
      'brightYellowP10': 9,
      'pinkP11': 10,
      'ceruleanP12': 11
    }
  }
}

module.exports = {
  colorDefinitions
}
