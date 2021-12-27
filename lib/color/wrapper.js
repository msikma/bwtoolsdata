// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

const {convertIngameText, convertIngameChat, convertBriefingText, convertMapName} = require('./interface')
const {convertObjectToString} = require('./convert')
const {swatchDefinitions, controlDefinitions} = require('../data')

/**
 * Creates colorization wrapper functions from the list of swatches.
 * 
 * These functions are used to colorize and style in-game StarCraft strings. Essentially, each color swatch
 * should get its own function which, when passed a string (and an object with some metadata), can return
 * another string that includes colorization. For instance, an HTML wrapper function would return
 * the original string wrapped in a <div style="font-color: red;"> .. </div>.
 */
const createConversionWrappers = (wrapperFactory, swatches = swatchDefinitions, specialCodes = controlDefinitions) => {
  // Note: the specialCodes items are plain strings. We'll wrap them in an object for consistency with the swatches.
  const allItems = [...Object.entries(swatches), ...Object.entries(specialCodes).map(([k, v]) => [k, {type: v}])]
  const wrapperFunctions = {}
  for (const [name, data] of allItems) {
    wrapperFunctions[name] = wrapperFactory(name, data)
  }
  return wrapperFunctions
}

/**
 * Creates an object of functions that can convert a StarCraft string directly into an output string.
 * 
 * This simplifies the conversion process; instead of first converting into an object and then running
 * the convertObjectToString() function, these functions does both in one step using the provided wrapperFactory.
 */
const createTextConverter = (wrapperFactory, swatches = swatchDefinitions, specialCodes = controlDefinitions) => {
  const wrapperFunctions = createConversionWrappers(wrapperFactory, swatches, specialCodes)
  return {
    convertIngameText: str => convertObjectToString(convertIngameText(str), wrapperFunctions),
    convertIngameChat: str => convertObjectToString(convertIngameChat(str), wrapperFunctions),
    convertBriefingText: str => convertObjectToString(convertBriefingText(str), wrapperFunctions),
    convertMapName: str => convertObjectToString(convertMapName(str), wrapperFunctions)
  }
}

module.exports = {
  createConversionWrappers,
  createTextConverter
}
