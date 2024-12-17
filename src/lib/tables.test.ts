// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {describe, it, expect} from 'vitest'
import {
  briefingTextColor,
  ingameTextColor,
  playerColor,
  mapTileset,
  gameType,
  gameSpeed,
} from './tables.ts'

const lookupTables = {
  briefingTextColor,
  ingameTextColor,
  playerColor,
  mapTileset,
  gameType,
  gameSpeed,
}
const colorLookupTables = {
  briefingTextColor,
  ingameTextColor,
  playerColor,
}

describe(`lookup tables`, () => {
  for (const [name, lookupTable] of Object.entries(lookupTables)) {
    describe(`${name}`, () => {
      it(`can look up values by id, slug and name`, () => {
        expect(() => lookupTable.byId(0x02)).not.toThrow()
        expect(() => lookupTable.bySlug('slug')).not.toThrow()
        expect(() => lookupTable.byName('Name')).not.toThrow()
      })
    })
  }
  for (const [name, lookupTable] of Object.entries(colorLookupTables)) {
    describe(`${name}`, () => {
      it(`has color information in the return data`, () => {
        const val1 = lookupTable.byId(0x02)
        if (val1 === undefined) {
          return
        }
        expect(val1.data).toBeDefined()
        expect(val1.data.color).toBeDefined()
        expect(val1.data.color).toBeDefined()
        expect(typeof val1.data.color[0]).toEqual('number')
        expect(typeof val1.data.color[1]).toEqual('number')
        expect(typeof val1.data.color[2]).toEqual('number')
      })
    })
  }
})
