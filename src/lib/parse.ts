// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {
  briefingTextColorCodeTable,
  ingameTextColorCodeTable,
  briefingTextSpecialCodeTable,
  ingameTextSpecialCodeTable
} from './tables.ts'
import {stripControlCharacters} from '../util/text.ts'
import type {TextToken, TextParseContext, TextParseBehavior} from '../types.ts'

// Briefing text context names.
const briefingTextContext = new Set(['briefing', 'map_name', 'map_description'])

// Ingame text context names.
const ingameTextContext = new Set(['ingame'])

// Behavior type names.
const behaviorTypes = new Set(['original', 'remastered'])

/**
 * Returns a lookup table for either briefing or ingame text color codepoints.
 */
function getParserColorCodeMap(context: TextParseContext) {
  if (briefingTextContext.has(context)) {
    return briefingTextColorCodeTable
  }
  if (ingameTextContext.has(context)) {
    return ingameTextColorCodeTable
  }
  throw new Error(`Invalid text parsing context value: ${context}`)
}

/**
 * Returns a lookup table for either briefing or ingame text special codepoints.
 */
function getParserSpecialCodeMap(context: TextParseContext) {
  if (briefingTextContext.has(context)) {
    return briefingTextSpecialCodeTable
  }
  if (ingameTextContext.has(context)) {
    return ingameTextSpecialCodeTable
  }
  throw new Error(`Invalid text parsing context value: ${context}`)
}

/**
 * Parses Brood War game text.
 * 
 * This returns a list of tokens, some of which are text, and some of which are special codes.
 * A special code is either a color, or an align code, or a no-op.
 * 
 * In Brood War, text will have a default color; if includeDefaultColor is true, one such token
 * will precede the other tokens.
 * 
 * If stripInvisibles is true, invisible characters are stripped out of the text.
 * This is recommended, as it ensures there are no problematic characters in the output.
 * 
 * There's subtly different behavior between the original game and Remastered.
 * The behavior value toggles between them. Typically you want this to be set to "remastered".
 */
export function parseGameText(
  input: string,
  context: TextParseContext,
  behavior: TextParseBehavior,
  includeDefaultColor: boolean = false,
  stripInvisibles: boolean = true,
): TextToken[] {
  const tokens: TextToken[] = []
  let buffer: string[] = []

  if (typeof input !== 'string') {
    throw new Error('Input must be a string')
  }
  if (!behaviorTypes.has(behavior)) {
    throw new Error(`Invalid text parsing behavior value: ${behavior}`)
  }

  // Pick our lookup tables by context type.
  const colorCodeMap = getParserColorCodeMap(context)
  const specialCodeMap = getParserSpecialCodeMap(context)

  // Function to flush the buffer to the tokens list.
  const flushBuffer = () => {
    if (!buffer.length) {
      return
    }
    let text = buffer.join('')
    if (stripInvisibles) {
      text = stripControlCharacters(text)
    }
    tokens.push({
      text,
      code: null
    })
    buffer = []
  }

  // Function to add a code token to the list.
  const pushCodeToken = (code: TextToken['code']) => {
    tokens.push({
      text: null,
      code: code!,
    })
  }

  // If we want the default color to be there at the start, add it now.
  if (includeDefaultColor) {
    const defaultColorCode = specialCodeMap.getDefaultTextColorCode(behavior)
    const colorCode = colorCodeMap.byCode(defaultColorCode)!
    pushCodeToken(colorCode)
  }

  // Iterate over the input character by character. If the character is a control code,
  // we'll add a special token to the tokens list that indicates the effect of the control code.
  // If a character is regular text, we'll add it to the buffer. The text buffer is added to the
  // tokens list whenever needed (before a control token, or at the end of the string).
  for (const char of input) {
    const codePoint = char.codePointAt(0)!
    const colorCode = colorCodeMap.byCode(codePoint)
    const specialCode = specialCodeMap.byCode(codePoint)

    // If there's no token for this code, this is a regular text character.
    if (colorCode === undefined && specialCode === undefined) {
      buffer.push(char)
      continue
    }
    
    // If we have a code, first flush the buffer.
    flushBuffer()

    if (colorCode) {
      // Add color token.
      pushCodeToken(colorCode)
    }
    else if (specialCode) {
      // Add special token.
      pushCodeToken(specialCode)
    }
  }

  // Flush whatever is left in the buffer.
  flushBuffer()

  return tokens
}

/**
 * Parses briefing text and returns text tokens.
 * 
 * See parseGameText() for details.
 */
export function parseBriefingText(input: string, includeDefaultColor: boolean = false, stripInvisibles: boolean = true): TextToken[] {
  return parseGameText(input, 'briefing', 'remastered', includeDefaultColor, stripInvisibles)
}

/**
 * Parses ingame text and returns text tokens.
 * 
 * See parseGameText() for details.
 */
export function parseIngameText(input: string, includeDefaultColor: boolean = false, stripInvisibles: boolean = true): TextToken[] {
  return parseGameText(input, 'ingame', 'remastered', includeDefaultColor, stripInvisibles)
}

// These are just aliases for the briefing text parser.
export const parseMapName = parseBriefingText
export const parseMapDescription = parseBriefingText
