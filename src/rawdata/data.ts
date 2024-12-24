// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import type {BwTextData, BwSwatch, BwTileset, BwGameType, BwGameSpeed} from '../types.ts'

// This is special data related to text rendering.
// Text rendering has a number of caveats, and there are a number of special control codes.
// The text rendering is subtly different between Remastered and Original.
export const textData: BwTextData = {
  briefingText: {
    // Default briefing text color (changed to white since StarCraft: Remastered).
    defaultTextColor: {
      original: 0x02, // Pale blue,
      remastered: 0x06, // White
    },
    specialCodes: [
      {codes: [0x0B, 0x14], type: 'INVISIBLE', onlyWorksInOriginal: true},
      {codes: [0x12], type: 'RIGHT_ALIGN'}, // In SCMDraft: <R>
      {codes: [0x13], type: 'CENTER_ALIGN'}, // In SCMDraft: <C>
      {codes: [0x01, 0x1A], type: 'NO_OP'},
    ]
  },
  ingameText: {
    // Default color for text printed by the map or game triggers.
    defaultTextColor: {
      original: 0x02, // Pale blue
      remastered: 0x02,
    },
    // Default color for chat messages posted by in-game players.
    // When watching a replay, player messages use defaultTextColor, not defaultChatColor.
    defaultChatColor: {
      original: 0x07, // Green
      remastered: 0x07,
    },
    specialCodes: [
      {codes: [0x0B, 0x14], type: 'INVISIBLE', onlyWorksInOriginal: true},
      {codes: [0x12], type: 'RIGHT_ALIGN'}, // In SCMDraft: <R>
      {codes: [0x13], type: 'CENTER_ALIGN'}, // In SCMDraft: <C>
      {codes: [0x01, 0x1A], type: 'NO_OP'},
    ],
  }
}

// These are all the game speeds that can be set.
// The original vanilla StarCraft default speed online was "fast".
// It got changed to "fastest" when Brood War launched, which is the default today.
// The number indicates the milliseconds taken per game frame.
export const gameSpeedData: BwGameSpeed[] = [
  {id: 0x00, name: 'Slowest', slug: 'slowest', data: {msPerFrame: 167}},
  {id: 0x01, name: 'Slower', slug: 'slower', data: {msPerFrame: 111}},
  {id: 0x02, name: 'Slow', slug: 'slow', data: {msPerFrame: 83}},
  {id: 0x03, name: 'Normal', slug: 'normal', data: {msPerFrame: 67}},
  {id: 0x04, name: 'Fast', slug: 'fast', data: {msPerFrame: 56}},
  {id: 0x05, name: 'Faster', slug: 'faster', data: {msPerFrame: 48}},
  {id: 0x06, name: 'Fastest', slug: 'fastest', data: {msPerFrame: 42}},
]

// Color swatches used during briefing sequences.
export const briefingTextColorSwatchData: BwSwatch[] = [
  {id: 0x00, name: 'Pale blue', slug: 'bt_pale_blue', data: {color: [164, 180, 248], code: 0x02}},
  {id: 0x01, name: 'Green', slug: 'bt_green', data: {color: [76, 196, 40], code: 0x03}},
  {id: 0x02, name: 'Light green', slug: 'bt_light_green', data: {color: [180, 252, 116], code: 0x04}},
  {id: 0x03, name: 'Gray', slug: 'bt_gray', data: {color: [88, 88, 88], code: 0x05}},
  {id: 0x04, name: 'White', slug: 'bt_white', data: {color: [255, 255, 255], code: 0x06}},
  {id: 0x05, name: 'Red', slug: 'bt_red', data: {color: [252, 0, 0], code: 0x07}},
]

// Color swatches usable in in-game text.
export const ingameTextColorSwatchData: BwSwatch[] = [
  {id: 0x00, name: 'Pale blue', slug: 'ig_pale_blue', data: {color: [184, 184, 232], code: 0x02}},
  {id: 0x01, name: 'Yellow', slug: 'ig_yellow', data: {color: [220, 220, 60], code: 0x03}},
  {id: 0x02, name: 'White', slug: 'ig_white', data: {color: [255, 255, 255], code: 0x04}},
  {id: 0x03, name: 'Gray', slug: 'ig_gray', data: {color: [132, 116, 116], code: 0x05}},
  {id: 0x04, name: 'Red', slug: 'ig_red', data: {color: [200, 24, 24], code: 0x06}},
  {id: 0x05, name: 'Green', slug: 'ig_green', data: {color: [16, 252, 24], code: 0x07}},
]

// Color swatches that are usable as player/team colors.
export const playerColorSwatchData: BwSwatch[] = [
  // The following are player colors: all the ones with a 'codes' array are usable as in-game text message color.
  {id: 0x00, name: 'Red', slug: 'red', data: {color: [244, 4, 4], code: 0x08}},
  {id: 0x01, name: 'Blue', slug: 'blue', data: {color: [12, 72, 204], code: 0x0e}},
  {id: 0x02, name: 'Teal', slug: 'teal', data: {color: [44, 180, 148], code: 0x0f}},
  {id: 0x03, name: 'Purple', slug: 'purple', data: {color: [136, 64, 156], code: 0x10}},
  {id: 0x04, name: 'Orange', slug: 'orange', data: {color: [248, 140, 20], code: 0x11}},
  {id: 0x05, name: 'Brown', slug: 'brown', data: {color: [112, 48, 20], code: 0x15}},
  {id: 0x06, name: 'White', slug: 'white', data: {color: [204, 224, 208], code: 0x16}},
  {id: 0x07, name: 'Yellow', slug: 'yellow', data: {color: [252, 252, 56], code: 0x17}},
  {id: 0x08, name: 'Green', slug: 'green', data: {color: [8, 128, 8], code: 0x18}},
  {id: 0x09, name: 'Pale yellow', slug: 'pale_yellow', data: {color: [252, 252, 124], code: 0x19}},
  {id: 0x0a, name: 'Tan', slug: 'tan', data: {color: [236, 196, 176], code: 0x1b}},
  // Cerulean is not selectable due to being reserved for the "neutral" player.
  // The color name is also unofficial, as it doesn't seem to have a canonical name.
  {id: 0x0b, name: 'Cerulean', slug: 'cerulean', data: {color: [64, 104, 212], isUnselectable: true, code: 0x1c}},
  {id: 0x0c, name: 'Pale green', slug: 'pale_green', data: {color: [116, 164, 124], code: 0x1d}},
  {id: 0x0d, name: 'Bluish gray', slug: 'bluish_gray', data: {color: [144, 144, 184], code: 0x1e}},
  // Turquoise was selectable in early versions of StarCraft: Remastered, but was made unselectable
  // for minimap visibility reasons as it's the same color used by minerals and geysers.
  {id: 0x0f, name: 'Turquoise', slug: 'turquoise', data: {color: [0, 228, 252], isUnselectable: true, code: 0x1f}},
  {id: 0x10, name: 'Pink', slug: 'pink', data: {color: [255, 196, 228]}},
  {id: 0x11, name: 'Olive', slug: 'olive', data: {color: [120, 120, 0]}},
  {id: 0x12, name: 'Lime', slug: 'lime', data: {color: [210, 245, 60]}},
  {id: 0x13, name: 'Navy', slug: 'navy', data: {color: [0, 0, 230]}},
  {id: 0x15, name: 'Magenta', slug: 'magenta', data: {color: [240, 50, 230]}},
  {id: 0x16, name: 'Gray', slug: 'gray', data: {color: [128, 128, 128]}},
  {id: 0x17, name: 'Black', slug: 'black', data: {color: [60, 60, 60]}},
  // The following player colors technically exist but are unused and not selectable at all.
  {id: 0x0e, name: 'Pale yellow', slug: 'pale_yellow_2', data: {color: [252, 252, 124], isUnused: true}},
  {id: 0x14, name: 'Cerulean', slug: 'cerulean_2', data: {color: [64, 104, 212], isUnused: true}},
]

// Map tileset types. Each tileset has certain restrictions on what colors you're allowed to pick.
// For example, you can't pick orange on the desert tileset. This ensures sufficient visibility on the minimap.
// Additionally, the installation tileset is only used in the campaign and cannot be played in melee.
export const mapTilesetData: BwTileset[] = [
  {id: 0x00, name: 'Badlands', slug: 'badlands', data: {bannedColors: []}},
  {id: 0x01, name: 'Space Platform', slug: 'platform', data: {bannedColors: [0x16, 0x17]}},
  {id: 0x02, name: 'Installation', slug: 'install', data: {isCampaignOnly: true, bannedColors: [0x01, 0x0d, 0x13]}},
  {id: 0x03, name: 'Ash World', slug: 'ashworld', data: {bannedColors: [0x16, 0x17]}},
  {id: 0x04, name: 'Jungle World', slug: 'jungle', data: {bannedColors: []}},
  {id: 0x05, name: 'Desert', slug: 'desert', data: {bannedColors: [0x04]}},
  {id: 0x06, name: 'Ice', slug: 'ice', data: {bannedColors: [0x06]}},
  {id: 0x07, name: 'Twilight', slug: 'twilight', data: {bannedColors: [0x0d]}},
]

// Game types. Some of these are not technically available in StarCraft.
export const gameTypeData: BwGameType[] = [
  // TODO: check all with repmastered
  {id: 0x00, name: 'None', slug: 'none', data: {isUnselectable: true}},
  // "Custom" comes from WarCraft III replay files.
  {id: 0x01, name: 'Custom', slug: 'custom', data: {isUnselectable: true}},
  {id: 0x02, name: 'Melee', slug: 'melee', data: {}},
  {id: 0x03, name: 'Free For All', slug: 'ffa', data: {}},
  {id: 0x04, name: 'One on One', slug: '1v1', data: {}},
  {id: 0x05, name: 'Capture the Flag', slug: 'ctf', data: {}},
  {id: 0x06, name: 'Greed', slug: 'greed', data: {}},
  {id: 0x07, name: 'Slaughter', slug: 'slaughter', data: {}},
  {id: 0x08, name: 'Sudden Death', slug: 'sudden_death', data: {}},
  // Despite the name, "ladder" is not used for ladder games. See "Top vs Bottom".
  {id: 0x09, name: 'Ladder', slug: 'ladder', data: {}},
  {id: 0x0a, name: 'Use Map Settings', slug: 'ums', data: {}},
  {id: 0x0b, name: 'Team Melee', slug: 'team_melee', data: {}},
  {id: 0x0c, name: 'Team Free For All', slug: 'team_ffa', data: {}},
  {id: 0x0d, name: 'Team Capture the Flag', slug: 'team_ctf', data: {}},
  // "Unknown" is a placeholder and is not actually defined in any Blizzard game.
  {id: 0x0e, name: 'Unknown', slug: 'unk', data: {isUnselectable: true}},
  // "Top vs Bottom" is a selectable game mode and is the default type for ladder games.
  {id: 0x0f, name: 'Top vs Bottom', slug: 'tvb', data: {}},
  // "Iron Man Ladder" comes from WarCraft II replay files.
  {id: 0x10, name: 'Iron Man Ladder', slug: 'iron_man_ladder', data: {isUnselectable: true}},
]
