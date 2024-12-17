// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {
  textData,
  briefingTextColorSwatchData,
  ingameTextColorSwatchData,
  playerColorSwatchData,
  mapTilesetData,
  gameTypeData,
  gameSpeedData
} from '../rawdata/data.ts'
import {createLookupTable, createColorCodeLookupTable, createSpecialCodeLookupTable} from '../util/lookup.ts'

/** Lookup table for the Brood War briefing text (also used for map names). */
export const briefingTextColor = createLookupTable(briefingTextColorSwatchData)
/** Lookup table for in-game text color swatches. */
export const ingameTextColor = createLookupTable(ingameTextColorSwatchData)
/** Lookup table for player colors. */
export const playerColor = createLookupTable(playerColorSwatchData)
/** Lookup table for map tilesets. */
export const mapTileset = createLookupTable(mapTilesetData)
/** Lookup table for game types. */
export const gameType = createLookupTable(gameTypeData)
/** Lookup table for game speed. */
export const gameSpeed = createLookupTable(gameSpeedData)

/** Lookup table for briefing colors, by color code. */
export const briefingTextColorCodeTable = createColorCodeLookupTable(briefingTextColorSwatchData)
/** Lookup table for ingame colors (and player colors), by color code. */
export const ingameTextColorCodeTable = createColorCodeLookupTable([...ingameTextColorSwatchData, ...playerColorSwatchData])

/** Lookup table for special control codes for briefing text. */
export const briefingTextSpecialCodeTable = createSpecialCodeLookupTable(textData.briefingText)
/** Lookup table for special control codes for ingame text. */
export const ingameTextSpecialCodeTable = createSpecialCodeLookupTable(textData.ingameText)
