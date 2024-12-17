// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {describe, it, expect} from 'vitest'
import {getSwatchFromSlotId, getSwatchFromTeamId} from './swatch.ts'

describe(`utility functions`, () => {
  describe(`getSwatchFromSlotId()`, () => {
    it(`does not accept null or undefined as input`, () => {
      expect(() => getSwatchFromSlotId(null)).toThrow()
      expect(() => getSwatchFromSlotId(undefined)).toThrow()
    })
    it(`does not accept slot ids outside of 0x00..0x17`, () => {
      expect(() => getSwatchFromSlotId(-1)).toThrow()
      expect(() => getSwatchFromSlotId(23)).not.toThrow()
      expect(() => getSwatchFromSlotId(24)).toThrow()
    })
    it(`returns the correct swatches for a given slot id`, () => {
      const red = getSwatchFromSlotId(0x00)
      expect(red.slug).toBe('red')
      const blue = getSwatchFromSlotId(0x01)
      expect(blue.slug).toBe('blue')
      const yellow = getSwatchFromSlotId(0x07)
      expect(yellow.slug).toBe('yellow')
      const black = getSwatchFromSlotId(0x17)
      expect(black.slug).toBe('black')
    })
  })
  describe(`getSwatchFromTeamId()`, () => {
    it(`does not accept null or undefined as input`, () => {
      expect(() => getSwatchFromTeamId(null)).toThrow()
      expect(() => getSwatchFromTeamId(undefined)).toThrow()
    })
    it(`does not accept slot ids outside of 0x00..0x17`, () => {
      expect(() => getSwatchFromTeamId(-1)).toThrow()
      expect(() => getSwatchFromTeamId(23)).not.toThrow()
      expect(() => getSwatchFromTeamId(24)).toThrow()
    })
    it(`returns the correct swatches for a given team id`, () => {
      const neutral = getSwatchFromTeamId(0x00)
      expect(neutral.slug).toBe('yellow')
      const team1 = getSwatchFromTeamId(0x01)
      expect(team1.slug).toBe('red')
      const team2 = getSwatchFromTeamId(0x02)
      expect(team2.slug).toBe('blue')
      const team3 = getSwatchFromTeamId(0x03)
      expect(team3.slug).toBe('teal')
      const team4 = getSwatchFromTeamId(0x04)
      expect(team4.slug).toBe('purple')
    })
  })
})
