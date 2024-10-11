// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

// Note: slugs are specifically the internal names for these tileset.
// They are slightly different from the proper names. See the readme file.

export const tilesetDefinitions = {
  0x00: {name: 'Badlands', slug: 'badlands', id: 0, bannedColors: []},
  0x01: {name: 'Space Platform', slug: 'platform', id: 1, bannedColors: [22, 23]},
  0x02: {name: 'Installation', slug: 'installation', id: 2, isCampaignOnly: true, bannedColors: [1, 13, 19]},
  0x03: {name: 'Ash World', slug: 'ashworld', id: 3, bannedColors: [22, 23]},
  0x04: {name: 'Jungle World', slug: 'jungle', id: 4, bannedColors: []},
  0x05: {name: 'Desert', slug: 'desert', id: 5, bannedColors: [4]},
  0x06: {name: 'Ice', slug: 'ice', id: 6, bannedColors: [6]},
  0x07: {name: 'Twilight', slug: 'twilight', id: 7, bannedColors: [13]}
}
