// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {stripControlCharacters, escapeRegex, normalizeWhitespace} from '../util/text.ts'
import type {MapName, MapNameMisc, MapNameSegments, MapNamePlayers, MapNameObs, MapNameVersion, MapNameExtractedData, MapNameMiscItems} from '../types.ts'

/**
 * Returns a regular expression for parsing segments.
 */
function makeSegmentRegex(reBase: string, fromStart: boolean, fromEnd: boolean): RegExp {
  const sections = []
  if (fromStart) {
    sections.push(`^${reBase}`)
  }
  if (fromEnd) {
    sections.push(`${reBase}$`)
  }
  return new RegExp(`(${sections.join('|')})`, 'g')
}

/**
 * Extracts miscellaneous information from a map name.
 */
function extractMisc(mapName: string): MapNameMisc {
  // Starting point for the tag extractions. Iteratively modified on each step.
  let clean = mapName.trim()

  // A number of name tags commonly used by Brood War tournaments and various other entities.
  const miscTags: [keyof MapNameMiscItems, RegExp][] = [
    ['isICCup', /\| iCCup \|/i],
    ['isSTL', /^STL_/],
    ['isPGT', /^PGT\s+-\s+/],
    ['isPLU', /^PLU_/],
    ['isIEF', /^PLU_/],
    ['isBSL', /BSL$/],
    ['isKeSPA', /_KeSPA/],
  ]

  // We'll add tags (isICCup, isSTL, etc) here if they are found.
  const miscData: MapNameMiscItems = {}

  for (const [tagIndicator, tagRe] of miscTags) {
    const tagCheck = clean.match(tagRe)
    if (!tagCheck) {
      continue
    }
    miscData[tagIndicator] = true
    clean = clean.replace(tagRe, '').trim()
  }
  
  return [clean.trim(), miscData]
}

/**
 * Extracts enclosed segments from a map name.
 * 
 * Segments can be extracted from the start of the string, the end of the string, or both.
 * Normally segments are only extracted from the end.
 */
function extractSegments(mapName: string, chars: [string, string], fromStart: boolean = true, fromEnd: boolean = true): MapNameSegments {
  // Create regex based on the requested characters.
  const charStart = escapeRegex(chars[0])
  const charEnd = escapeRegex(chars[1])
  const re = makeSegmentRegex(`(${charStart}[^0-9${charEnd}]+?${charEnd})`, fromStart, fromEnd)

  const matches = mapName.match(re) || []
  const clean = mapName.replace(re, '')

  return [
    clean.trim(),
    matches.map(match => match.slice(1, -1))
  ]
}

/**
 * Extracts the player amount from a map title, e.g. (1) through (8) at the start of a name.
 */
function extractPlayers(mapName: string): MapNamePlayers {
  const re = /^(\([1-9]{1}\))/

  const matches = mapName.match(re) ?? []
  const clean = mapName.replace(re, '')

  return [
    clean.trim(),
    matches[1] ? Number(matches[1].slice(1, -1)) : null
  ]
}

/**
 * Extracts whether this is an observer map.
 */
function extractObs(mapName: string): MapNameObs {
  const re = [/(\(Ob\))$/i, /OBS$/i]

  const matches = re.map(r => !!mapName.match(r))
  const clean = re.reduce((clean, r) => clean.replace(r, ''), mapName)

  return [
    clean.trim(),
    matches.includes(true)
  ]
}

/**
 * Extracts a version number from a map name.
 */
function extractVersion(mapName: string): MapNameVersion {
  const re = /(([0-9]+)\.{1}([0-9]+)([A-Za-z]{1})?)$/

  const version = mapName.match(re) ?? []
  const clean = mapName.replace(re, '')

  return [
    clean.trim(),
    version[1] ? version[1].trim() : null
  ]
}

/**
 * Wraps the data extracted from a map name into an object.
 */
function wrapMapNameData(cleanName: string, partiallyCleanName: string, originalName: string, extractedData: MapNameExtractedData): MapName {
  // We've now extracted all metadata components from the map name.
  // From here we'll put together a number of different "versions" of the name,
  // each with a different use case.
  const {version, misc, parentheses, brackets, acutes, isObs} = extractedData

  return {
    // Plain map name: all metadata removed.
    cleanName,
    // Plain map name with version indicator (if the original map name had one).
    cleanNameWithVersion: `${cleanName}${version ? ` ${version}` : ''}`,
    // Partially clean map name: the most common metadata removed.
    partiallyCleanName,
    // As above, but with a version indicator.
    partiallyCleanNameWithVersion: `${partiallyCleanName}${version ? ` ${version}` : ''}`,
    // Original name, albeit with control codes and extra whitespace stripped.
    originalName,
    // Metadata we've collected.
    metadata: {
      version,
      tags: [...parentheses, ...brackets, ...acutes],
      isObserverMap: isObs,
      ...misc,
    }
  }
}

/**
 * Parses a map name and returns a cleaned up map name and an object of metadata values.
 * 
 * The idea behind this function is to be able to identify various versions and edits of maps
 * by its name alone. It also helps create a "clean" map name to display in interfaces.
 * In some cases it can also be helpful to group together replays played on different
 * versions of maps into one collection.
 * 
 * This function does a whole bunch of string wrangling that's determined to work in practice
 * by testing it on lots of different map names and verifying the results.
 * By definition this is a very subjective function, and the behavior might be changed in the
 * future to keep up with changes in map naming conventions.
 * 
 * See the readme file for more information.
 */
export function getCleanMapName(rawMapName: string): MapName {
  if (typeof rawMapName !== 'string') {
    throw new Error('Invalid map name')
  }

  // 1: Remove control codes and extraneous whitespace.
  const step1 = normalizeWhitespace(stripControlCharacters(rawMapName))

  // 2: Remove the map player count, e.g. (2) or (4).
  const [step2, players] = extractPlayers(step1)

  // 3: Remove the observer indicator.
  const [step3, isObs] = extractObs(step2)

  // 4: Remove the version number (1).
  const [step4, version1] = extractVersion(step3)

  // 5, 6, 7: Extract parentheses, brackets and acutes.
  const [step5, parentheses] = extractSegments(step4, ['(', ')'])
  const [step6, brackets] = extractSegments(step5, ['[', ']'])
  const [step7, acutes] = extractSegments(step6, ['<', '>'])

  // 8: Remove the version number (2).
  const [step8, version2] = extractVersion(step7)

  // 9: Remove miscellaneous tags (e.g. iCCup).
  const [step9, misc] = extractMisc(step8)

  // 10: Remove the version number (3).
  const [step10, version3] = extractVersion(step9)

  // 11: Remove any additional whitespace.
  const step11 = normalizeWhitespace(step10)
  
  // We'll make two different clean versions of the name:
  // one with *all* the cleaning filters applied, and one with only *some* applied.
  // The second one is arguably a safer version and less likely to be oversimplified.
  const fullyCleanedName = step11

  // For the partially clean name, we skip steps 5, 6, and 7.
  const [step5b] = extractVersion(step4)
  const [step6b] = extractMisc(step5b)
  const [step7b] = extractVersion(step6b)
  const partiallyCleanedName = normalizeWhitespace(step7b)

  // Finally, we also return the original name, albeit with extraneous whitespace and control codes stripped.
  const originalName = step1

  // All metadata components have now been extracted and stripped out of the map's original name.
  // Wrap all information into a single object and return it.
  return wrapMapNameData(
    fullyCleanedName,
    partiallyCleanedName,
    originalName,
    {
      version: version1 || version2 || version3,
      misc,
      parentheses,
      brackets,
      acutes,
      players,
      isObs,
    }
  )
}
