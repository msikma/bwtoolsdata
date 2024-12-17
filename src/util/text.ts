// @dada78641/bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

/**
 * Strips ASCII control characters, except for tab, line feed and carriage return.
 * 
 * This is used to strip out problematic characters from text strings inside Brood War maps or replays.
 */
export function stripControlCharacters(input: string): string {
  return input.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '')
}

/**
 * Formats a number as a two character hex string prefixed by 0x.
 */
export function formatHex(input: number): string {
  return `0x${input.toString(16).padStart(2, '0')}`
}

/**
 * Escapes a string for use in a regular expression.
 */
export function escapeRegex(input: string): string {
  return input.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

/**
 * Normalizes and trims whitespace from a string.
 * 
 * Replaces multiple inner whitespace characters with a single string.
 */
export function normalizeWhitespace(input: string): string {
  return input.replace(/\s+/g, ' ').trim()
}
