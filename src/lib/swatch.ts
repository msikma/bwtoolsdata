// @dada78641/bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {playerColor} from './tables.ts'
import {formatHex} from '../util/text.ts'
import type {BwSwatch} from '../types.ts'

// The neutral team color id.
const COLOR_NEUTRAL_TEAM: number = 0x07

/**
 * Returns a swatch for a given player slot id.
 * 
 * For example, for player id 0, this will return 'playerRed'.
 */
export function getSwatchFromSlotId(slotId: number): BwSwatch {
  const swatch = playerColor.byId(slotId)
  if (swatch === undefined) {
    throw new Error(`Invalid player slot id: ${formatHex(slotId)}`)
  }
  return swatch
}

/**
 * Returns the swatch name a player would get if the colors are switched.
 * 
 * Brood War lets you swap player colors to team colors by pressing shift, tab, tab.
 * What this actually does is swap player colors to team colors. The color a player gets
 * depends on their team id. If a player's team id is 0, the color is yellow.
 * 
 * Depending on the game type used, this is either useful or not useful.
 * For example, in a Top vs Bottom game, all players have sequential team numbers,
 * so players will become red and blue. In a UMS, all human players are always the same team,
 * so all human players become red (CPU opponents are the next team, so they all become blue).
 * 
 * Some game modes set all players to team id 0, causing all players to become yellow.
 * See the readme for more information.
 */
export function getSwatchFromTeamId(teamId: number): BwSwatch {
  if (teamId == null) {
    throw new Error(`Invalid team id`)
  }
  // Note: it's unknown at this point how many teams you can legitimately have in a game.
  // Probably up to 0x08, as there are max 8 teams. But at the very least it can't be more
  // than 0x17, as that's the last extant color.
  if (teamId > 0x17) {
    throw new Error(`Team id exceeds range: ${formatHex(teamId)}`)
  }
  
  if (teamId === 0) {
    // Always return the neutral team color if the team id is 0.
    // For some game types this is always true.
    const swatch = playerColor.byId(COLOR_NEUTRAL_TEAM)!
    return swatch
  }

  // If the team id is set, it's one-indexed; i.e. red is 1, and so on.
  const swatch = playerColor.byId(teamId - 1)
  if (swatch === undefined) {
    throw new Error(`Invalid team id: ${formatHex(teamId)}`)
  }
  return swatch
}
