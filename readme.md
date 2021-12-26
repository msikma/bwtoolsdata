[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/sctoolsdata.svg)](https://badge.fury.io/js/sctoolsdata)

# sctoolsdata

A collection of StarCraft internal data used to help process replay and map files.

## Usage

This library is available via npm:

```
npm i --save sctoolsdata
```

TODO: explain more about how this is used.

## Reference

**Function:**

```js
framesToMs(frames[, speed])
```

**Parameters:**

* `frames` **number**
  number of in-game frames per second
* `speed` **string** (default: *"fastest"*)\
  game speed (virtually always "fastest")

**Returns:**

* **number**
  the number of milliseconds representing the duration of the game frames

Used to get timestamps of game events for a given game speed. For example, this can be used to display a timestamp for a chat message, or to show the duration of a game.

----

**Function:**

```js
getSwatchFromPlayerID(id)
```

**Parameters:**

* `id` **number**
  player ID to return the color for

**Returns:**

* **string**
  swatch name for the color associated with that player ID

Every player ID has a default color; for example, player 1 is red, player 2 is blue, etc. This function is used to return the color swatch name associated with a given ID.

----

**Function:**

```js
getColorFromSwatch(swatch[, returnType])
```

**Parameters:**

* `swatch` **string**
  swatch name to return the color value for
* `returnType` **string<"hex" | "int">** (default: *"hex"*)
  type of value to return; either a hex string or a number

**Returns:**

* **string&nbsp;|&nbsp;number**
  the color value of the given swatch name

This function can be used to get the actual colors to be displayed for a given swatch (e.g. `"paleBlue"` will return `"#b8b8e8"`).

----

TODO.

### Internal StarCraft data

#### Colors

Colors work quite inconsistently in StarCraft. There are two sets of color codes: one for briefing messages (and map names), and one for in-game chat messages. These each have their quirks that can be different between Brood War (v1.16.1 and below) and Remastered.

Here's a list of all colors:

<table border="2">
<tbody>
<tr><th colspan="2" align="left">Briefing/map name colors</th><th colspan="2" align="left">Hex value</th><th align="left">Code</th></tr>
<tr><td colspan="2">Pale blue</td><td><img src="./resources/swatch-previews/swatch-briefing-a4b4f8.png" width="32" height="12" alt="Preview for briefing swatch #a4b4f8"></td><td>#a4b4f8</td><td>0x02</td></tr>
<tr><td colspan="2">Green</td><td><img src="./resources/swatch-previews/swatch-briefing-4cc428.png" width="32" height="12" alt="Preview for briefing swatch #4cc428"></td><td>#4cc428</td><td>0x03</td></tr>
<tr><td colspan="2">Light green</td><td><img src="./resources/swatch-previews/swatch-briefing-b4fc74.png" width="32" height="12" alt="Preview for briefing swatch #b4fc74"></td><td>#b4fc74</td><td>0x04</td></tr>
<tr><td colspan="2">Gray†</td><td><img src="./resources/swatch-previews/swatch-briefing-585858.png" width="32" height="12" alt="Preview for briefing swatch #585858"></td><td>#585858</td><td>0x05</td></tr>
<tr><td colspan="2">White</td><td><img src="./resources/swatch-previews/swatch-briefing-ffffff.png" width="32" height="12" alt="Preview for briefing swatch #ffffff"></td><td>#ffffff</td><td>0x06</td></tr>
<tr><td colspan="2">Red</td><td><img src="./resources/swatch-previews/swatch-briefing-fc0000.png" width="32" height="12" alt="Preview for briefing swatch #fc0000"></td><td>#fc0000</td><td>0x07</td></tr>
</tbody>
<tbody>
<tr><th colspan="2" align="left">Text message colors</th><th colspan="2" align="left">Hex value</th><th align="left">Code</th></tr>
<tr><td colspan="2">Pale blue</td><td><img src="./resources/swatch-previews/swatch-text-b8b8e8.png" width="32" height="12" alt="Preview for text swatch #b8b8e8"></td><td>#b8b8e8</td><td>0x02</td></tr>
<tr><td colspan="2">Yellow</td><td><img src="./resources/swatch-previews/swatch-text-dcdc3c.png" width="32" height="12" alt="Preview for text swatch #dcdc3c"></td><td>#dcdc3c</td><td>0x03</td></tr>
<tr><td colspan="2">White</td><td><img src="./resources/swatch-previews/swatch-text-ffffff.png" width="32" height="12" alt="Preview for text swatch #ffffff"></td><td>#ffffff</td><td>0x04</td></tr>
<tr><td colspan="2">Red</td><td><img src="./resources/swatch-previews/swatch-text-c81818.png" width="32" height="12" alt="Preview for text swatch #c81818"></td><td>#c81818</td><td>0x06</td></tr>
<tr><td colspan="2">Green</td><td><img src="./resources/swatch-previews/swatch-text-10fc18.png" width="32" height="12" alt="Preview for text swatch #10fc18"></td><td>#10fc18</td><td>0x07</td></tr>
<tr><td colspan="2">Gray‡</td><td><img src="./resources/swatch-previews/swatch-text-847474.png" width="32" height="12" alt="Preview for text swatch #847474"></td><td>#847474</td><td>0x05</td></tr>
<tr><td colspan="2">Gray green</td><td><img src="./resources/swatch-previews/swatch-text-74a47c.png" width="32" height="12" alt="Preview for text swatch #74a47c"></td><td>#74a47c</td><td>0x1d</td></tr>
<tr><td colspan="2">Blue gray</td><td><img src="./resources/swatch-previews/swatch-text-9090b8.png" width="32" height="12" alt="Preview for text swatch #9090b8"></td><td>#9090b8</td><td>0x1e</td></tr>
<tr><td colspan="2">Turquoise</td><td><img src="./resources/swatch-previews/swatch-text-00e4fc.png" width="32" height="12" alt="Preview for text swatch #00e4fc"></td><td>#00e4fc</td><td>0x1f</td></tr>
<tr><td>Red</td><td>Player 1</td><td><img src="./resources/swatch-previews/swatch-text-f40404.png" width="32" height="12" alt="Preview for text swatch #f40404"></td><td>#f40404</td><td>0x08</td></tr>
<tr><td>Blue</td><td>Player 2</td><td><img src="./resources/swatch-previews/swatch-text-0c48cc.png" width="32" height="12" alt="Preview for text swatch #0c48cc"></td><td>#0c48cc</td><td>0x0e</td></tr>
<tr><td>Teal</td><td>Player 3</td><td><img src="./resources/swatch-previews/swatch-text-2cb494.png" width="32" height="12" alt="Preview for text swatch #2cb494"></td><td>#2cb494</td><td>0x0f</td></tr>
<tr><td>Purple</td><td>Player 4</td><td><img src="./resources/swatch-previews/swatch-text-88409c.png" width="32" height="12" alt="Preview for text swatch #88409c"></td><td>#88409c</td><td>0x10</td></tr>
<tr><td>Orange</td><td>Player 5</td><td><img src="./resources/swatch-previews/swatch-text-f88c14.png" width="32" height="12" alt="Preview for text swatch #f88c14"></td><td>#f88c14</td><td>0x11</td></tr>
<tr><td>Brown</td><td>Player 6</td><td><img src="./resources/swatch-previews/swatch-text-703014.png" width="32" height="12" alt="Preview for text swatch #703014"></td><td>#703014</td><td>0x15</td></tr>
<tr><td>White</td><td>Player 7</td><td><img src="./resources/swatch-previews/swatch-text-cce0d0.png" width="32" height="12" alt="Preview for text swatch #cce0d0"></td><td>#cce0d0</td><td>0x16</td></tr>
<tr><td>Yellow</td><td>Player 8</td><td><img src="./resources/swatch-previews/swatch-text-fcfc38.png" width="32" height="12" alt="Preview for text swatch #fcfc38"></td><td>#fcfc38</td><td>0x17</td></tr>
<tr><td>Green</td><td>Player 9</td><td><img src="./resources/swatch-previews/swatch-text-088008.png" width="32" height="12" alt="Preview for text swatch #088008"></td><td>#088008</td><td>0x18</td></tr>
<tr><td>Bright yellow</td><td>Player 10</td><td><img src="./resources/swatch-previews/swatch-text-fcfc7c.png" width="32" height="12" alt="Preview for text swatch #fcfc7c"></td><td>#fcfc7c</td><td>0x19</td></tr>
<tr><td>Pink</td><td>Player 11</td><td><img src="./resources/swatch-previews/swatch-text-ecc4b0.png" width="32" height="12" alt="Preview for text swatch #ecc4b0"></td><td>#ecc4b0</td><td>0x1b</td></tr>
<tr><td>Cerulean</td><td>Player 12</td><td><img src="./resources/swatch-previews/swatch-text-4068d4.png" width="32" height="12" alt="Preview for text swatch #4068d4"></td><td>#4068d4</td><td>0x1c</td></tr>
</tbody>
</table>

†: In Brood War, gray is buggy: when it's used, the rest of the map name becomes gray as well. This was fixed in Remastered.

‡: Like briefing messages, gray will take over the entire rest of the line inside text messages, in this case both in Brood War and Remastered. This buggy behavior is not completely implemented, and more research is needed to determine every edge case.

See the [edge cases](edge-cases.md) document for more information.

#### Speed

Number of milliseconds per game frame for each game speed.

E.g. for "Fastest", there are approximately 1000 / 42 = ~23.81 frames in a second. This is used to convert the number of game frames into real time.

| Name    | ㎳/frame | Frames/second | % of "Fastest" |
|:--------|:--------|:---------------|:---------------|
| Fastest | 42  | 23.810 | 100.0% |
| Faster  | 48  | 20.833 | 87.5% |
| Fast    | 56  | 17.857 | 75.0% |
| Normal  | 67  | 14.925 | 62.7% |
| Slow    | 83  | 12.048 | 50.6% |
| Slower  | 111 | 9.009 | 37.8% |
| Slowest | 167 | 5.988 | 25.1% |

By far most replays use "Fastest" as the speed, but this map can be used for the rare case that isn't.

## License

MIT license
