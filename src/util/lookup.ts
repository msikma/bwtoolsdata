// @dada78641/bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import type {BwData, BwSwatch, BwTextSetData, TextParseBehavior, BwSpecialCode} from '../types.ts'

/**
 * Creates a Map from a list of BwData based items by a given key.
 */
function mapByKey<T>(data: BwData<T>[], key: 'id' | 'name' | 'slug'): Map<string | number, BwData<T>> {
  return new Map(data.map(item => [item[key], item]))
}

/**
 * Creates a lookup table for Brood War data.
 */
export function createLookupTable<T>(data: BwData<T>[]) {
  // Create Map objects for performing quick lookups.
  const mapId = mapByKey(data, 'id')
  const mapName = mapByKey(data, 'name')
  const mapSlug = mapByKey(data, 'slug')
  
  return {
    byId: (id: number): BwData<T> | undefined => mapId.get(id),
    byName: (name: string): BwData<T> | undefined => mapName.get(name),
    bySlug: (slug: string): BwData<T> | undefined => mapSlug.get(slug),
  }
}

/**
 * Creates a lookup table for color swatches by code.
 * 
 * This allows colors to be looked up by the code that triggers it.
 */
export function createColorCodeLookupTable(data: BwSwatch[]) {
  // Get a list of all swatches that have a code set.
  const swatchesWithCode: [number, BwSwatch][] = data
    .filter(item => item.data.code !== undefined)
    .map(item => [item.data.code as number, item])
  const mapCode = new Map(swatchesWithCode)

  return {
    byCode: (code: number): BwSwatch | undefined => mapCode.get(code),
  }
}

/**
 * Creates a lookup table for special text codes.
 * 
 * This takes care of control codes other than colors, and the default color values.
 */
export function createSpecialCodeLookupTable(data: BwTextSetData) {
  // Get a list of all special control codes.
  const specialCodes: [number, BwSpecialCode][] = data.specialCodes
    .filter(item => item.codes !== undefined)
    .flatMap(item => item.codes.map(code => [code, {...item, code}] as [number, BwSpecialCode]))
  const mapSpecialCodes = new Map(specialCodes)

  // Returns the default text color code.
  const getDefaultTextColorCode = (behavior: TextParseBehavior) => {
    const value = data.defaultTextColor[behavior]
    if (value === undefined) {
      throw new Error(`Invalid behavior value: ${behavior}`)
    }
    return value
  }

  return {
    getDefaultTextColorCode,
    byCode: (code: number): BwSpecialCode | undefined => mapSpecialCodes.get(code),
  }
}
