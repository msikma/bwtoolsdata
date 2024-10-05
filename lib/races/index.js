// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

/**
 * Sorts races according to which is the "active" race in the matchup.
 * 
 * Other than mirror matchups, this produces either ['Z', 'P'], ['P', 'T'] or ['T', 'Z'].
 * Any letter other than {Z, P, T}, e.g. 'R' for random, is placed at the end of the list.
 * 
 * This should generally only be used either for sorting teams, or for 1v1 matchups.
 * It can be used as a stable matchup indicator, so that e.g. ZvP and PvZ matchups are all
 * sorted under the same label rather than under two different labels.
 */
export const sortRaces = (memberA, memberB) => {
  const a = String(memberA).trim().toUpperCase()
  const b = String(memberB).trim().toUpperCase()

  const validRaces = ['Z', 'P', 'T']
  const matchup = `${a}v${b}`
  const active = ['ZvP', 'PvT', 'TvZ']
  const passive = ['PvZ', 'TvP', 'ZvT']

  if (a === b) {
    return 0
  }
  if (active.includes(matchup)) {
    return -1
  }
  if (passive.includes(matchup)) {
    return 1
  }
  if (validRaces.includes(a)) {
    return -1
  }
  if (validRaces.includes(b)) {
    return 1
  }

  // Fall back to simple asciibetic for anything else.
  return a > b ? 1 : -1
}
