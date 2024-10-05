// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

const {pickSwatches} = require('./util')
const controlDefinitions = require('./control')
const swatchDefinitions = require('./swatches')

/**
 * List of color control codes and definitions.
 * 
 * This lists all the colors used in StarCraft for the purposes of displaying text messages,
 * and the colors used by players.
 */
const colorDefinitions = {
  /** Color definitions for briefing text. */
  briefingText: {
    // TODO
    // Default colors (changed to white since StarCraft: Remastered).
    defaultColor: {
      bw: 'briefingPaleBlue',
      r: 'briefingWhite'
    },
    // Text style control codes.
    specialCodes: [
      {codes: [0x0B, 0x14], type: controlDefinitions.INVISIBLE, onlyWorksInBW: true},
      {codes: [0x12], type: controlDefinitions.RIGHT_ALIGN}, // In SCMDraft: <R>
      {codes: [0x13], type: controlDefinitions.CENTER_ALIGN}, // In SCMDraft: <C>
      {codes: [0x01, 0x1A], type: controlDefinitions.NO_OP}
    ],
    swatches: pickSwatches(key => key.startsWith('briefing'), swatchDefinitions)
  },

  /** Color definitions for text messages that appear in-game. */
  ingameText: {
    // Default colors; 'text' for in-game text lines printed by the map, 'chat' for player chat lines.
    defaultColorText: {
      bw: 'ingamePaleBlue',
      r: 'ingamePaleBlue'
    },
    defaultColorChat: {
      bw: 'ingameGreen',
      r: 'ingameGreen'
    },
    // Text style control codes.
    specialCodes: [
      {codes: [0x0B, 0x14], type: controlDefinitions.INVISIBLE, onlyWorksInBW: false},
      {codes: [0x12], type: controlDefinitions.RIGHT_ALIGN},
      {codes: [0x13], type: controlDefinitions.CENTER_ALIGN},
      {codes: [0x01, 0x0C, 0x1A], type: controlDefinitions.NO_OP}
    ],
    swatches: pickSwatches((key, swatch) => key.startsWith('text') || (swatch.id !== null && swatch.codes), swatchDefinitions)
  },

  /** Color definitions for players. */
  playerColors: {
    swatches: pickSwatches(key => key.startsWith('player'), swatchDefinitions)
  },
}

module.exports = colorDefinitions
