// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {describe, it, expect} from 'vitest'
import {framesToMs} from './speed.ts'
import {gameSpeed} from './tables.ts'

describe(`utility functions`, () => {
  describe(`framesToMs()`, () => {
    it(`does not accept null or undefined as input`, () => {
      expect(() => framesToMs(null)).toThrow()
      expect(() => framesToMs(undefined)).toThrow()
      expect(() => framesToMs()).toThrow()
    })
    it(`converts in-game frames to the correct number of milliseconds`, () => {
      const fastest = gameSpeed.bySlug('fastest')!
      const faster = gameSpeed.bySlug('faster')!
      const fast = gameSpeed.bySlug('fast')!
      const normal = gameSpeed.bySlug('normal')!
      const slow = gameSpeed.bySlug('slow')!
      const slower = gameSpeed.bySlug('slower')!
      const slowest = gameSpeed.bySlug('slowest')!
      expect(framesToMs(1514, fastest.data.msPerFrame)).toBe(63588)
      expect(framesToMs(1514, fastest.data.msPerFrame)).toBe(63588)
      expect(framesToMs(1651, faster.data.msPerFrame)).toBe(79248)
      expect(framesToMs(1463, fast.data.msPerFrame)).toBe(81928)
      expect(framesToMs(1535, normal.data.msPerFrame)).toBe(102845)
      expect(framesToMs(1452, slow.data.msPerFrame)).toBe(120516)
      expect(framesToMs(1455, slower.data.msPerFrame)).toBe(161505)
      expect(framesToMs(1454, slowest.data.msPerFrame)).toBe(242818)
    })
  })
})
