[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/sctoolsdata.svg)](https://badge.fury.io/js/sctoolsdata)

# sctoolsdata

A collection of StarCraft data used to help interpret replay and map files.

### Included data

| Name | Type | Description |
|:-----|:-----|:------------|
| framesToMs(frames[,&nbsp;speed]) | Function | Returns the amount of realtime milliseconds of a given number of frames, at a given game speed ("fastest" by default) |
| speedDefinitions | Object | List of the number of game frames per second for each game speed |
| colorDefinitions | Object | Object containing game colors and escape codes used to control in-game text messages |
| codeTableBriefing | Object | Lookup table constructed from `colorDefinitions` for briefing text |
| codeTableText | Object | Lookup table constructed from `codeTableText` for in-game text messages |
| idTableSwatches | Object | List linking player IDs to color swatch names |
| allCodes | Object | List of all control codes for any purpose |

## License

MIT license
