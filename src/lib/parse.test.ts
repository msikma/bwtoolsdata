// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import {describe, it, expect} from 'vitest'
import {parseGameText, parseBriefingText, parseIngameText} from './parse.ts'
import type {TextToken, TextParseContext, TextParseBehavior, BwSwatch} from '../types.ts'

interface TestCase {
  input: string
  context: TextParseContext
  expected: {
    // Not the full TextToken type. Simplified version to simplify the test.
    // We just need to check that a valid "slug" or "type" is there.
    text: string | null
    code: {slug: string} | {type: string} | null
  }[]
}

// Test cases for parseGameText(). This checks the input strings against the tokens we expect to see.
// The token .code properties actually have more data in them (they are BwSwatch items),
// but we only check for the .slug value to verify they're the swatches we expected.
const testCases: TestCase[] = [
  {
    // Polypoid 1.65 map name.
    input: '\x07Polyp\x06oid \x061\x03.65',
    context: 'map_name',
    expected: [
      {text: null, code: {slug: 'bt_red'}},
      {text: 'Polyp', code: null},
      {text: null, code: {slug: 'bt_white'}},
      {text: 'oid ', code: null},
      {text: null, code: {slug: 'bt_white'}},
      {text: '1', code: null},
      {text: null, code: {slug: 'bt_green'}},
      {text: '.65', code: null}
    ],
  },
  {
    // Polypoid 1.65 map description.
    input: '\x04Usually harmless.\r\n' +
      '\x04However, there is a small risk of \x07malignancy.\r\n' +
      '\r\n' +
      'Created by KM-\r\n' +
      'Released 2021.3.11.',
    context: 'map_description',
    expected: [
      {text: null, code: {slug: 'bt_light_green'}},
      {text: 'Usually harmless.\r\n', code: null},
      {text: null, code: {slug: 'bt_light_green'}},
      {text: 'However, there is a small risk of ', code: null},
      {text: null, code: {slug: 'bt_red'}},
      {text: 'malignancy.\r\n\r\nCreated by KM-\r\nReleased 2021.3.11.', code: null},
    ],
  },
  {
    input: '\x07Polyp\x06oid \x061\x03.65',
    context: 'briefing',
    expected: [
      {text: null, code: {slug: 'bt_red'}},
      {text: 'Polyp', code: null},
      {text: null, code: {slug: 'bt_white'}},
      {text: 'oid ', code: null},
      {text: null, code: {slug: 'bt_white'}},
      {text: '1', code: null},
      {text: null, code: {slug: 'bt_green'}},
      {text: '.65', code: null}
    ],
  },
  {
    input: 'nothing',
    context: 'ingame',
    expected: [
      {text: 'nothing', code: null},
    ],
  },
  {
    input: '\x02paleblue\x03yellow',
    context: 'ingame',
    expected: [
      {text: null, code: {slug: 'ig_pale_blue'}},
      {text: 'paleblue', code: null},
      {text: null, code: {slug: 'ig_yellow'}},
      {text: 'yellow', code: null},
    ],
  },
  {
    input: '\x08player 1\x0eplayer 2\x17player 8',
    context: 'ingame',
    expected: [
      {text: null, code: {slug: 'red'}},
      {text: 'player 1', code: null},
      {text: null, code: {slug: 'blue'}},
      {text: 'player 2', code: null},
      {text: null, code: {slug: 'yellow'}},
      {text: 'player 8', code: null},
    ],
  },
  {
    input: '\x08player 1\x0eplayer 2\x17player 8',
    context: 'briefing',
    expected: [
      {text: 'player 1player 2player 8', code: null},
    ],
  },
  // {
  //   input: 'yes\x09tab no\x0b vertical tab',
  //   context: 'ingame',
  //   expected: [
  //     {text: 'yes\x09tab no vertical tab', code: null},
  //   ],
  // },
  {
    input: 'yes\x09tab no\x11 XON device control character',
    context: 'briefing',
    expected: [
      {text: 'yes\x09tab no XON device control character', code: null},
    ],
  },
  {
    input: 'yes\x09tab no\x11 XON device control character',
    context: 'ingame',
    expected: [
      {text: 'yes\x09tab no XON device control character', code: null},
    ],
  },
  {
    input: 'none\x08red',
    context: 'ingame',
    expected: [
      {text: 'none', code: null},
      {text: null, code: {slug: 'red'}},
      {text: 'red', code: null},
    ],
  },
  {
    input: '\x13center aligned text',
    context: 'ingame',
    expected: [
      {text: null, code: {type: 'CENTER_ALIGN'}},
      {text: 'center aligned text', code: null},
    ],
  },
]

describe(`text parsing functions`, () => {
  describe('parseGameText()', () => {
    it('should throw an error when given an invalid context', () => {
      expect(() => parseGameText('foobar', 'invalid' as TextParseContext, 'original')).toThrow()
      expect(() => parseGameText('foobar', null as unknown as TextParseContext, 'remastered')).toThrow()
      expect(() => parseGameText('foobar', undefined as unknown as TextParseContext, 'original')).toThrow()
    })
    it('should throw an error when given an invalid behavior', () => {
      expect(() => parseGameText('foobar', 'briefing', 'a' as TextParseBehavior)).toThrow()
      expect(() => parseGameText('foobar', 'briefing', 'b' as TextParseBehavior)).toThrow()
      expect(() => parseGameText('foobar', 'ingame', 'c' as TextParseBehavior)).toThrow()
    })
    it('includes a default color token if specified', () => {
      expect((parseGameText('foobar', 'briefing', 'remastered', true, true)[0].code as BwSwatch).slug).toBe('bt_white')
      expect((parseGameText('foobar', 'ingame', 'remastered', true, true)[0].code as BwSwatch).slug).toBe('ig_pale_blue')
      expect((parseGameText('foobar', 'briefing', 'original', true, true)[0].code as BwSwatch).slug).toBe('bt_pale_blue')
      expect((parseGameText('foobar', 'ingame', 'original', true, true)[0].code as BwSwatch).slug).toBe('ig_pale_blue')
    })
  })
  const testCasesBriefing = testCases.filter(testCase => testCase.context !== 'ingame')
  const testCasesIngame = testCases.filter(testCase => testCase.context === 'ingame')
  const testTypes = [
    ['parseBriefingText', testCasesBriefing, parseBriefingText],
    ['parseIngameText', testCasesIngame, parseIngameText],
  ]
  for (const [name, parserTestCases, parseFunction] of testTypes) {
    if (parseFunction !== parseBriefingText && parseFunction !== parseBriefingText) {
      continue
    }
    describe(`${name}()`, () => {
      const includeDefaultColor = false
      const stripInvisibles = true
      const testArgs = [includeDefaultColor, stripInvisibles]
      
      it('should throw an error when given an invalid input string', () => {
        expect(() => parseFunction({text: 'foobar'} as unknown as string, ...testArgs)).toThrow()
        expect(() => parseFunction(5 as unknown as string, ...testArgs)).toThrow()
        expect(() => parseFunction(null as unknown as string, ...testArgs)).toThrow()
        expect(() => parseFunction(undefined as unknown as string, ...testArgs)).toThrow()
      })
      it('should correctly parse game text', () => {
        for (const testCase of parserTestCases as TestCase[]) {
          const res = parseFunction(testCase.input, ...testArgs)
          expect(res.length).toBe(testCase.expected.length)
          for (let n = 0; n < res.length; ++n) {
            expect(res[n].text).toBe(testCase.expected[n].text)
            expect(res[n].code).toEqual(expect.objectContaining(testCase.expected[n].code))
          }
        }
      })
    })
  }
})
