// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

const {framesToMs} = require('./index')

describe(`speed conversion functions`, () => {
  describe(`framesToMs()`, () => {
    it(`does not accept null or undefined as input`, () => {
      expect(() => framesToMs(null)).toThrow()
      expect(() => framesToMs(undefined)).toThrow()
      expect(() => framesToMs()).toThrow()
    })
    it(`converts in-game frames to the correct number of milliseconds`, () => {
      // Note: these are all about 1 minute of in-game time on "Fastest".
      // Tested by making 9 Drones and an Overlord from the start of a game.
      expect(framesToMs(1514)).toBe(63588)
      expect(framesToMs(1514, 'fastest')).toBe(63588)
      expect(framesToMs(1651, 'faster')).toBe(79248)
      expect(framesToMs(1463, 'fast')).toBe(81928)
      expect(framesToMs(1535, 'normal')).toBe(102845)
      expect(framesToMs(1452, 'slow')).toBe(120516)
      expect(framesToMs(1455, 'slower')).toBe(161505)
      expect(framesToMs(1454, 'slowest')).toBe(242818)
    })
  })
})
