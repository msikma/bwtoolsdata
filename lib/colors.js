// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

/**
 * Creates a list of all control codes from each passed color set.
 */
const collectAllCodes = colorSets => {
  const allCodes = [...new Set(colorSets.flatMap(colorSet => Object.keys(colorSet).map(code => parseInt(code))))]
  return allCodes
}

/**
 * Creates a control code lookup table for a color set (either 'briefingMessage' or 'textMessage' from the color definitions).
 * 
 * This maps control codes to code objects, such that looking up the code returns the full object.
 * For example, it maps both 0x0B and 0x14 to the {codes: [0x0B, 0x14], type: 'INVISIBLE', onlyWorksInBW: true} object.
 */
const makeLookupTable = colorSet => {
  const specialCodeEntries = colorSet.specialCodes.flatMap(codeObject => codeObject.codes.map(code => [code, codeObject]))
  const codeEntries = Object.entries(colorSet.codes).flatMap(([name, codes]) => codes.map(code => [code, {color: name}]))
  return Object.fromEntries([...specialCodeEntries, ...codeEntries])
}

module.exports = {
  collectAllCodes,
  makeLookupTable
}
