// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

// Result of the sort function.
type SortResult = -1 | 0 | 1

// Races that are in the lookup table.
const validRaces = new Set(['T', 'P', 'Z'])

// Race matchup ordering.
const raceSortMap = new Map([
  ['Z', new Map<string, SortResult>([['T', 1], ['Z', 0], ['P', -1]])],
  ['T', new Map<string, SortResult>([['P', 1], ['T', 0], ['Z', -1]])],
  ['P', new Map<string, SortResult>([['Z', 1], ['P', 0], ['T', -1]])],
])

/**
 * Sort function that orders Brood War races according to which is the "active" race in the matchup.
 * 
 * Other than mirror matchups, this produces either ['Z', 'P'], ['P', 'T'] or ['T', 'Z'].
 * Any letter other than {Z, P, T}, e.g. 'R' for random, is always placed at the end of the list.
 * 
 * As observer, the order of the matchups does not matter - a ZvT is the same as a TvZ. Sorting races
 * allows matchups to be put in the same collection regardless of what order the players are in.
 * 
 * This is designed primarily for sorting 1v1 matchups, team vs team matchups, or FFA matchups.
 */
export function sortRaces(raceA: string, raceB: string): SortResult {
  // Ignore mirror matchups.
  if (raceA === raceB) {
    return 0
  }
  // Always sort invalid races (including "random") to the right.
  if (!validRaces.has(raceA)) {
    return 1
  }
  if (!validRaces.has(raceB)) {
    return -1
  }
  // Sort valid races based on the lookup table.
  return raceSortMap.get(raceA)!.get(raceB)!
}
