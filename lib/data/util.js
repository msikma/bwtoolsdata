// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

/**
 * Returns a lookup table for the swatches list.
 */
const makeSwatchTable = (swatches, filterPredicate = null) => {
  let entries = swatches.map(swatch => [swatch.slug, {...swatch, colorInt: parseInt(swatch.color.slice(1), 16)}])
  if (filterPredicate) {
    entries = entries.filter(filterPredicate)
  }
  return Object.fromEntries(entries)
}

/**
 * Returns a subset of the swatches object containing all items matching a given prefix.
 */
const pickSwatches = (predicate, swatchesList) => {
  return makeSwatchTable(swatchesList, ([key, swatch]) => predicate(key, swatch))
}

/**
 * Creates a list of all control codes from each passed color set.
 */
const getAllControlCodes = lookupTables => {
  const allCodes = [...new Set(lookupTables.flatMap(table => Object.keys(table).map(code => parseInt(code))))]
  return allCodes.sort((a, b) => a - b)
}

/**
 * Creates a control code lookup table for a color set (either 'briefingText' or 'ingameText' from the color definitions).
 * 
 * This maps control codes to code objects, such that looking up the code returns the full object.
 * For example, it maps both 0x0B and 0x14 to the {codes: [0x0B, 0x14], type: 'INVISIBLE', onlyWorksInBW: true} object.
 */
const makeCodeTable = colorSet => {
  const specialCodeEntries = colorSet.specialCodes.flatMap(codeObject => codeObject.codes.map(code => [code, codeObject]))
  const codeEntries = Object.entries(colorSet.swatches).flatMap(([name, swatch]) => swatch.codes.map(code => [code, {color: name}]))
  return Object.fromEntries([...specialCodeEntries, ...codeEntries])
}

/**
 * Creates an ID lookup table for player colors.
 */
const makePlayerTable = colorSet => {
  return Object.fromEntries(Object.entries(colorSet).map(([name, swatch]) => [swatch.id, name]))
}

module.exports = {
  pickSwatches,
  getAllControlCodes,
  makeCodeTable,
  makeSwatchTable,
  makePlayerTable
}
