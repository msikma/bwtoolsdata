

// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {describe, it, expect} from 'vitest'
import {getCleanMapName} from './name.ts'
import mapNameFixtures from './name.fixtures.json'
import type {MapName} from '../types.ts'

describe(`map name cleaning functions`, () => {
  describe('getCleanMapName()', () => {
    it('should throw an error if not passed a string', () => {
      expect(() => getCleanMapName()).toThrow()
      expect(() => getCleanMapName(1)).toThrow()
      expect(() => getCleanMapName(null)).toThrow()
      expect(() => getCleanMapName(undefined)).toThrow()
      expect(() => getCleanMapName([])).toThrow()
    })
    it('should parse and clean map names correctly', () => {
      for (const testCase of mapNameFixtures) {
        // Raw map name with control codes.
        const input: string = testCase.rawMapName
        // The expected result.
        const expectedCleanMapName: MapName = testCase.cleanMapName as MapName
        // The original file from which we got this map name. Normally unused.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const source: string = testCase.srcFilename

        // Run the test.
        const cleanMapName = getCleanMapName(input)
        expect(cleanMapName.cleanName).toBe(expectedCleanMapName.cleanName)
        expect(cleanMapName).toStrictEqual(expectedCleanMapName)
      }
    })
  })
})
