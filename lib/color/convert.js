// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {swatchTable} from '../data/tables.js'

/**
 * No-op that passes through a single given string.
 */
const noop = str => str

/**
 * Runs an object from convertToObject() through our wrapper functions to produce a final string.
 * 
 * This requires a set of wrapper functions produced through createConversionWrappers().
 */
export const convertObjectToString = (codes, wrapperFunctions) => {
  let segments = []
  let activeSegment = []
  let activeWrapper = noop
  let outputWrapper = noop
  let hasOutputWrapper = false

  for (const code of codes) {
    const {char, type, isWrappingCode} = code

    if (isWrappingCode && !hasOutputWrapper) {
      outputWrapper = wrapperFunctions[type] ?? noop
      hasOutputWrapper = true
    }
    else if (type) {
      if (activeSegment.length) {
        segments.push(activeWrapper(activeSegment.join('')))
        activeSegment = []
      }

      // If this is a control code, push whatever we have on the stack now.
      activeWrapper = wrapperFunctions[type] ?? noop
    }
    else {
      // Push characters until we reach the next control code.
      activeSegment.push(char)
    }
  }

  if (activeSegment.length) {
    segments.push(activeWrapper(activeSegment.join('')))
    activeSegment = []
  }

  return outputWrapper(segments.join(''))
}

/**
 * Converts a string with StarCraft escape codes to an array of objects.
 * 
 * This array of objects can then be easily converted into an output string, such as one that
 * can be displayed in the terminal, or one that can be used in an HTML page.
 * 
 * When wrappingCode is set, a special code is included at the start which indicates that
 * the whole output string should be wrapped in a function call before output; this is used
 * to set the default color of a string. For example, chat messages are always wrapped in green.
 */
export const convertToObject = (input, codeTable, colorSet, controlCodes, wrappingSwatch = null) => {
  const buffer = []

  // Push a single wrapping code at the start if one is set.
  if (wrappingSwatch != null) {
    if (wrappingSwatch.color) {
      buffer.push({type: wrappingSwatch.slug, color: wrappingSwatch.color, isWrappingCode: true})
    }
    else {
      buffer.push({type: wrappingSwatch.type, isWrappingCode: true})
    }
  }

  while (true) {
    const next = input.shift()
    const char = next.charCodeAt(0)

    // Try to match the current character with an escape code.
    const code = codeTable[char]

    if (code != null && code.color) {
      // Push color escape codes.
      buffer.push({type: code.color, color: colorSet.swatches[code.color].color})
    }
    else if (code != null) {
      // Push valid non-color escape codes.
      buffer.push({type: code.type})
    }
    else if (controlCodes.includes(char)) {
      // If this is an invalid escape code (e.g. a text message code used in a map name), push and mark it as such.
      buffer.push({char, type: 'INVALID'})
    }
    else {
      // If not, just push the character.
      buffer.push({char: next})
    }
    if (input.length === 0) {
      break
    }
  }
  
  return buffer
}

/**
 * Returns a code for wrapping the output in.
 * 
 * This is used to set a default color for the string generator. If an invalid swatch is specified,
 * such as an in-game text message swatch for a briefing message converter, an error is thrown.
 */
const getWrappingSwatch = wrappingSwatch => {
  if (!wrappingSwatch) return null
  const swatch = swatchTable[wrappingSwatch]
  if (swatch.isUsableIngame === false) throw new Error(`Wrapping swatch is not usable in-game: ${wrappingSwatch}`)
  return swatch
}

/**
 * Factory function for creating converters for StarCraft text conversion.
 */
export const objectConverter = (codeTable, colorSet, controlCodes, defaultWrappingSwatchName) => (input, wrappingSwatchName) => {
  // Find the wrapping code object associated with a given swatch, if a wrapping swatch is needed.
  const wrappingSwatch = getWrappingSwatch(wrappingSwatchName || defaultWrappingSwatchName)
  return convertToObject([...input], codeTable, colorSet, controlCodes, wrappingSwatch)
}
