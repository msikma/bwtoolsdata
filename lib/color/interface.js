// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

const {objectConverter} = require('./convert')
const {colorDefinitions, codeTableIngame, codeTableBriefing, allCodes, idTablePlayer} = require('../data')

/**
 * Returns a swatch name from a player ID.
 * 
 * For example, for player id 0, this will return 'playerRedP1'.
 */
const getSwatchFromSlotID = id => {
  return idTablePlayer[id]
}

/**
 * Returns a color value from a swatch name.
 * 
 * Either returns it as a hex value, (e.g. '#ff0000'), or as an integer (16711680).
 */
const getColorFromSwatch = (swatch, type = 'hex') => {
  const hex = colorDefinitions.ingameText.swatches[swatch]
  if (!hex) throw new Error(`invalid swatch name: ${swatch}`)
  if (type === 'hex') return hex.slice(1)
  else if (type === 'int') return parseInt(hex.slice(1), 16)
  else throw new Error(`invalid type: ${type}`)
}

/**
 * Strips all escape codes from a StarCraft string.
 */
const stripEscapeCodes = str => {
  // StarCraft escape codes just reuse the ASCII invisible range, so we can just remove that.
  // Note that we don't remove \x09 (Horizontal Tab), \x0A (Line Feed) and \x0D (Carriage Return).
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
}

/**
 * Converts an in-game text string into an object.
 */
const convertIngameChat = objectConverter(codeTableIngame, colorDefinitions.ingameText, allCodes, 'ingameGreen')

/**
 * Converts an in-game text string into an object.
 */
const convertIngameText = objectConverter(codeTableIngame, colorDefinitions.ingameText, allCodes)

/**
 * Converts a briefing text string into an object.
 */
const convertBriefingText = objectConverter(codeTableBriefing, colorDefinitions.briefingText, allCodes)

/**
 * Converts a map name string into an object.
 */
const convertMapName = convertBriefingText

/**
 * Converts a chat message with player name into an object.
 */
const convertChatMessage = (playerName, playerSwatch, message) => {
  return [
    ...convertIngameText(`${playerName}: `, playerSwatch),
    ...convertIngameChat(message)
  ]
}

module.exports = {
  convertBriefingText,
  convertChatMessage,
  convertIngameChat,
  convertIngameText,
  convertMapName,
  getColorFromSwatch,
  getSwatchFromSlotID,
  stripEscapeCodes
}
