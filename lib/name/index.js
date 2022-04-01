// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

const {escapeRegex} = require('../data/util')

/**
 * Returns a regular expression with which to parse segments.
 */
const makeSegmentRegex = (reBase, fromStart, fromEnd) => {
  const sections = []
  if (fromStart) sections.push(`^${reBase}`)
  if (fromEnd) sections.push(`${reBase}$`)
  return new RegExp(`(${sections.join('|')})`, 'g')
}

/**
 * Extracts miscellaneous information from a map name.
 * 
 * Currently this just extracts the "iCCup" tag.
 */
const extractMisc = (mapName, {extractIccup = true} = {}) => {
  let clean = mapName
  const isIccup = clean.startsWith('| iCCup |')
  if (isIccup && extractIccup) {
    clean = clean.replace('| iCCup |', '').trim()
  }
  return [clean.trim(), {isIccup}]
}

/**
 * Extracts enclosed segments from a map name.
 * 
 * Segments can be extracted from the start of the string, the end of the string, or both.
 * Normally segments are only extracted from the end.
 */
const extractSegments = (mapName, chars, fromStart = false, fromEnd = true) => {
  const re = makeSegmentRegex(`(${escapeRegex(chars[0])}[^0-9${escapeRegex(chars[1])}]+?${escapeRegex(chars[1])})`, fromStart, fromEnd)
  const matches = mapName.match(re) ?? []
  const clean = mapName.replace(re, '')
  return [clean.trim(), matches.map(match => match.slice(1, -1))]
}

/**
 * Extracts the player amount from a map title, e.g. (1) through (8) at the start of a name.
 */
const extractPlayerAmount = mapName => {
  const re = /^(\([1-9]{1}\))/
  const matches = mapName.match(re) ?? []
  const clean = mapName.replace(re, '')
  return [clean.trim(), matches[1] ? Number(matches[1].slice(1, -1)) : null]
}

/**
 * Extracts a version number from a map name.
 */
const extractVersion = mapName => {
  const re = /(([0-9]+)\.{1}([0-9]+))$/
  const version = mapName.match(re) ?? []
  const clean = mapName.replace(re, '')
  return [clean.trim(), version[1] ? version[1].trim() : null]
}

/**
 * Parses a map name and returns a cleaned map name and an object of metadata.
 * 
 * The metadata returned includes a version, a list of tags, and an object of miscellaneous tags,
 * depending on what is found. The version has to be two groups of one or more digits enclosed in a period,
 * and the tags have to be enclosed in [brackets], (parentheses) or <arrows>.
 * 
 * Aside from the metadata, a number of cleaned versions of the names are returned:
 * 
 *   plainName: the plain name of the map with all metadata removed ("Eclipse")
 *   plainNameVersioned: the plain name, but with the version left intact ("Eclipse 1.2")
 *   cleanName: removed (2) etc. from the start of the name and keeps the rest; mainly for "(2)Butter"
 */
const parseMapName = rawMapName => {
  const clean1 = rawMapName.trim()
  const [clean2, playerAmount] = extractPlayerAmount(clean1)
  const [clean3, version1] = extractVersion(clean2)
  const [clean4, parentheses] = extractSegments(clean3, ['(', ')'])
  const [clean5, brackets] = extractSegments(clean4, ['[', ']'])
  const [clean6, arrows] = extractSegments(clean5, ['<', '>'])
  const [clean7, version2] = extractVersion(clean6)
  const [clean8, misc] = extractMisc(clean7)

  const plainName = clean8.trim()
  const cleanName = clean2.trim()
  const version = version1 || version2

  return {
    plainName,
    plainNameVersioned: `${plainName}${version ? ` ${version}` : ''}`,
    cleanName,
    version: version1 || version2,
    players: playerAmount,
    misc,
    tags: [...parentheses, ...brackets, ...arrows]
  }
}

module.exports = {
  parseMapName
}
