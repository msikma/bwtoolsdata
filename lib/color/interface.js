// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

const {objectConverter} = require('./convert')
const {colorDefinitions, swatchTable, codeTableIngame, codeTableBriefing, allCodes, idTablePlayer, gameTypeDefinitions} = require('../data')

/**
 * Returns a swatch name from a player ID.
 * 
 * For example, for player id 0, this will return 'playerRed'.
 */
const getSwatchFromSlotID = id => {
  return idTablePlayer[id]
}

/**
 * Returns the swatch name a player would get if the colors are switched (red, blue, yellow).
 * 
 * Which color a player gets depends on the exact game type used.
 * The game type needs to be passed as an integer value.
 */
const getSwitchedSwatch = (teamID, matchTypeID) => {
  const type = gameTypeDefinitions[matchTypeID]?.slug
  if (!type) {
    throw new Error(`Invalid game type: ${matchTypeID ? `0x${matchTypeID.toString(16).padStart(2, '0')}` : '(null)'}`)
  }

  // A number of game types result in a different color based on the team ID.
  // Most commonly, this results in red/blue colors, such as in top vs bottom.
  if (['team_ffa', 'team_melee', 'team_ctf', 'tvb'].includes(type)) {
    return getSwatchFromSlotID(teamID - 1)
  }

  // UMS matches result in all red colors.
  if (['ums'].includes(type)) {
    return getSwatchFromSlotID(0)
  }

  // Everything else results in all yellow colors.
  return getSwatchFromSlotID(7)
}

/**
 * Returns a color value from a swatch name.
 * 
 * Throws an error if an unknown swatch is used.
 */
const getColorFromSwatch = swatch => {
  const hex = swatchTable[swatch]
  if (!hex) {
    throw new Error(`Invalid swatch name: ${swatch}`)
  }
  return hex
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
  getSwitchedSwatch,
  getSwatchFromSlotID,
  stripEscapeCodes
}
