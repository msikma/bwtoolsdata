// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {makeCodeTable, makeSwatchTable, makePlayerTable, getAllControlCodes} from './util.js'
import {swatchDefinitions} from './swatches.js'
import {colorDefinitions} from './codes.js'

// Create lookup tables for each message type. We don't create one for players, as it does not use control codes.
export const codeTableBriefing = makeCodeTable(colorDefinitions.briefingText)
export const codeTableIngame = makeCodeTable(colorDefinitions.ingameText)

// Create lookup table for internal color IDs (filtering out 'null').
export const idTablePlayer = makePlayerTable(colorDefinitions.playerColors.swatches)

// Create lookup table for internal color IDs (filtering out 'null').
export const swatchTable = makeSwatchTable(swatchDefinitions)

// Collect a list of all codes, so we can filter them out and create a totally plaintext string.
// These are also used to handle invalid code tags, as sometimes people embed text message codes in briefing messages.
// Invalid tags usually display as black in StarCraft, although they're buggy and sometimes display as a random color.
export const allCodes = getAllControlCodes([codeTableBriefing, codeTableIngame])
