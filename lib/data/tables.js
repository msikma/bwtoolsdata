// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

const {makeCodeTable, makeSwatchTable, makePlayerTable, getAllControlCodes} = require('./util')
const swatchDefinitions = require('./swatches')
const colorDefinitions = require('./codes')

// Create lookup tables for each message type. We don't create one for players, as it does not use control codes.
const codeTableBriefing = makeCodeTable(colorDefinitions.briefingText)
const codeTableIngame = makeCodeTable(colorDefinitions.ingameText)

// Create lookup table for internal color IDs (filtering out 'null').
const idTablePlayer = makePlayerTable(colorDefinitions.playerColors.swatches)

// Create lookup table for internal color IDs (filtering out 'null').
const swatchTable = makeSwatchTable(swatchDefinitions)

// Collect a list of all codes, so we can filter them out and create a totally plaintext string.
// These are also used to handle invalid code tags, as sometimes people embed text message codes in briefing messages.
// Invalid tags usually display as black in StarCraft, although they're buggy and sometimes display as a random color.
const allCodes = getAllControlCodes([codeTableBriefing, codeTableIngame])

module.exports = {
  codeTableBriefing,
  codeTableIngame,
  swatchTable,
  idTablePlayer,
  allCodes
}
