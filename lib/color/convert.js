// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

/**
 * No-op that passes through a single given string.
 */
const noop = str => str

/**
 * Runs an object from convertToObject() through our wrapper functions to produce a final string.
 * 
 * This requires a set of wrapper functions produced through createConversionWrappers().
 */
const convertObjectToString = (codes, wrapperFunctions) => {
  let segments = []
  let activeSegment = []
  let activeWrapper = noop
  let outputWrapper = noop

  for (const code of codes) {
    const {char, type, isWrappingCode} = code

    if (isWrappingCode) {
      outputWrapper = wrapperFunctions[type] ?? noop
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
const convertToObject = (input, codeTable, colorSet, controlCodes, wrappingCode = null) => {
  const buffer = []

  // Push a single wrapping code at the start if one is set.
  if (wrappingCode != null) {
    if (wrappingCode.color) {
      buffer.push({type: wrappingCode.color, color: colorSet.swatches[wrappingCode.color].color, isWrappingCode: true})
    }
    else {
      buffer.push({type: wrappingCode.type, isWrappingCode: true})
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
const getWrappingCode = (codeTable, wrappingSwatch) => {
  if (!wrappingSwatch) return null
  if (!wrappingSwatch.codes?.length) throw new Error('Wrapping swatch has no control codes')
  const code = codeTable[wrappingSwatch.codes[0]]
  if (!code) throw new Error('Wrapping swatch not found')
  return code
}

/**
 * Factory function for creating converters for StarCraft text conversion.
 */
const objectConverter = (codeTable, colorSet, controlCodes, wrappingSwatch) => {
  // Find the wrapping code object associated with a given swatch, if a wrapping swatch is needed.
  const wrappingCode = getWrappingCode(codeTable, wrappingSwatch)
  return input => convertToObject([...input], codeTable, colorSet, controlCodes, wrappingCode)
}

module.exports = {
  convertToObject,
  objectConverter,
  convertObjectToString
}
