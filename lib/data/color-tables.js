// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

const {colorDefinitions} = require('./colors')
const {makeLookupTable, collectAllCodes} = require('../colors')
const {objectFlip} = require('../util')

// Create lookup tables for each type.
const codeTableBriefing = makeLookupTable(colorDefinitions.briefingMessage)
const codeTableText = makeLookupTable(colorDefinitions.textMessage)

// Create lookup table for internal color IDs (filtering out 'null').
const idTableSwatches = objectFlip(Object.fromEntries(Object.entries(colorDefinitions.swatchIDs).filter(([swatch, id]) => id != null)))

// Collect a list of all codes, so we can filter them out and create a totally plaintext string.
// These are also used to handle invalid code tags, as sometimes people embed text message codes in briefing messages.
// Invalid tags usually display as black in StarCraft, although they're buggy and sometimes display as a random color.
const allCodes = collectAllCodes([codeTableBriefing, codeTableText])

/**
 * Returns a swatch name from a player ID.
 * 
 * For example, for player id 0, this will return 'redP1'.
 */
const getSwatchFromPlayerID = id => {
  return idTableSwatches[id]
}

/**
 * Returns a color value from a swatch name.
 * 
 * Either returns it as a hex value, (e.g. '#ff0000'), or as an integer (16711680).
 */
const getColorFromSwatch = (swatch, type = 'hex') => {
  const hex = colorDefinitions.textMessage.swatches[swatch]
  if (!hex) throw new Error(`invalid swatch name: ${swatch}`)
  if (type === 'hex') return hex.slice(1)
  else if (type === 'int') return parseInt(hex.slice(1), 16)
  else throw new Error(`invalid type: ${type}`)
}

module.exports = {
  codeTableBriefing,
  codeTableText,
  idTableSwatches,
  getSwatchFromPlayerID,
  getColorFromSwatch,
  allCodes
}
