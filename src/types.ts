// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

// Most data types have an id, name and slug that they are searchable by.
export type LookupType = {
  id: number
  name: string
  slug: string
}

// Generic type for Brood War data that has an id/name/slug plus some optional data.
export type BwData<T = unknown> = LookupType & {data: T}

export interface SwatchData {
  // The color in RGB values.
  color: [number, number, number],
  // Control code that triggers the color to show up in text.
  code?: number,
  // True if the color cannot be selected in a normal game.
  isUnselectable?: boolean,
  // True if the color is unused.
  isUnused?: boolean
}

export interface SpecialCodeData {
  // Special codes can have multiple control codes.
  codes: number[],
  // The supported values.
  type: 'INVISIBLE' | 'RIGHT_ALIGN' | 'CENTER_ALIGN' | 'NO_OP'
  // Some values only work in the original version and not in Remastered.
  onlyWorksInOriginal?: boolean
}

export interface TilesetData {
  // Player colors that are unselectable on this map.
  bannedColors: number[],
  // Tileset that cannot be played as melee map (only Installation).
  isCampaignOnly?: boolean
}

export interface GameTypeData {
  // Game types that cannot actually be used in Brood War.
  isUnselectable?: boolean
  // Brood War lets you swap player colors to team colors by pressing shift, tab, tab.
  // This infamously causes 
}

export interface SpeedData {
  // The speed is indicated as number of milliseconds per frame (lower is faster).
  msPerFrame: number
}

export type BwSwatch = BwData<SwatchData>
export type BwTileset = BwData<TilesetData>
export type BwGameType = BwData<GameTypeData>
export type BwGameSpeed = BwData<SpeedData>
export type BwSpecialCode = SpecialCodeData & {code: number}

export interface BwTextData {
  // Text displayed during the briefing section of a map.
  // This is also used for the map name itself in the map browser.
  briefingText: BwTextSetData
  // Text displayed while playing.
  ingameText: BwTextSetData
}

export interface BwTextSetData {
  // The default color that text should be rendered as, unless a color is set.
  defaultTextColor: {
    // Original game behavior.
    original: number
    // New behavior as of StarCraft: Remastered.
    remastered: number
  }
  // The color that chat messages by in-game players should be rendered as.
  defaultChatColor?: {
    original: number
    remastered: number
  }
  specialCodes: SpecialCodeData[]
}

// There are two sets of control codes: those for briefing text (which is also used for the map name),
// and for in-game text, which includes all the player colors as well.
// Briefing colors cannot be used in-game, and vice versa.
// "map_name" and "map_description" are aliases for "briefing".
export type TextParseContext = 'briefing' | 'ingame' | 'map_name' | 'map_description'

// Text parsing behavior is very subtly different between Original and Remastered.
export type TextParseBehavior = 'original' | 'remastered'

// Tokens returned by parseGameText().
export interface TextToken {
  text: string | null
  code: BwSwatch | BwSpecialCode | null
}

// Miscellaneous items we can find in a map name.
// Unlike regular boolean values, these are either not defined at all or always true.
// This is to save space, as the vast majority of maps will have none of these tags be true,
// and it's an extremely niche use case anyway.
export type MapNameMiscItems = {
  // iCCup tag: <https://liquipedia.net/starcraft/ICCup>
  isICCup?: true
  // STL tag: <https://liquipedia.net/starcraft/STL>
  isSTL?: true
  // PGTour tag: <https://liquipedia.net/starcraft/PGTour>
  isPGT?: true
  // PLU tag: <https://liquipedia.net/starcraft/PLU>
  isPLU?: true
  // PLU tag: <https://liquipedia.net/starcraft/IEF>
  isIEF?: true
  // BSL tag: <https://liquipedia.net/starcraft/Bombastic_StarLeague>
  isBSL?: true
  // KeSPA tag: <https://liquipedia.net/starcraft/KeSPA>
  isKeSPA?: true
}

// These are types used by parseMapName() for various parsing steps.
export type MapNameMisc = [string, MapNameMiscItems]
export type MapNameSegments = [string, string[]]
export type MapNamePlayers = [string, number | null]
export type MapNameObs = [string, boolean]
export type MapNameVersion = [string, string | null]

// Raw values parsed from a map name (not returned to the end user, as not all of it is useful).
export interface MapNameExtractedData {
  version: string | null
  misc: MapNameMiscItems
  parentheses: string[]
  brackets: string[]
  acutes: string[]
  players: number | null
  isObs: boolean
}

// Parsed map name object.
export interface MapName {
  cleanName: string
  cleanNameWithVersion: string
  partiallyCleanName: string
  partiallyCleanNameWithVersion: string
  originalName: string
  metadata: {
    version: string | null
    tags: string[]
    isObserverMap: boolean
  } & MapNameMiscItems
}
