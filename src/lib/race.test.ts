// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {describe, it, expect} from 'vitest'
import {sortRaces} from './race.ts'

describe(`utility functions`, () => {
  describe('sortRaces()', () => {
    it('should sort races as T → Z → P → T', () => {
      const result1 = ['P', 'Z'].sort(sortRaces)
      const result2 = ['Z', 'P'].sort(sortRaces)
      expect(result1).toEqual(['Z', 'P'])
      expect(result2).toEqual(['Z', 'P'])
      const result3 = ['T', 'P'].sort(sortRaces)
      const result4 = ['P', 'T'].sort(sortRaces)
      expect(result3).toEqual(['P', 'T'])
      expect(result4).toEqual(['P', 'T'])
      const result5 = ['Z', 'T'].sort(sortRaces)
      const result6 = ['T', 'Z'].sort(sortRaces)
      expect(result5).toEqual(['T', 'Z'])
      expect(result6).toEqual(['T', 'Z'])
    })

    it('should leave mirror matchups unchanged', () => {
      const resultZ = ['Z', 'Z'].sort(sortRaces)
      const resultP = ['P', 'P'].sort(sortRaces)
      const resultT = ['T', 'T'].sort(sortRaces)
      expect(resultZ).toEqual(['Z', 'Z'])
      expect(resultP).toEqual(['P', 'P'])
      expect(resultT).toEqual(['T', 'T'])
    })

    it('should place non-standard letters like R at the end', () => {
      const result1 = ['R', 'Z'].sort(sortRaces)
      const result2 = ['X', 'P'].sort(sortRaces)
      expect(result1).toEqual(['Z', 'R'])
      expect(result2).toEqual(['P', 'X'])
    })

    it('should sort correctly for FFA matches', () => {
      const result = ['T', 'P', 'Z', 'R'].sort(sortRaces)
      expect(result).toEqual(['Z', 'P', 'T', 'R'])
    })
  })
})
