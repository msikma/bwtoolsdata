// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

const {createTextConverter, convertMapName} = require('./index')

/**
 * A number of test strings taken from replay files.
 */
const testFixtures = {
  input: {
    polypoidMapName: '\x07Polyp\x06oid \x061\x03.65',
    polypoidMapDescription: '\x04Usually harmless.\r\n' +
      '\x04However, there is a small risk of \x07malignancy.\r\n' +
      '\r\n' +
      'Created by KM-\r\n' +
      'Released 2021.3.11.',
    lemonMapName: '\x07L\x04emon \x050.95',
    goodnight131MapName: '\x05G\x06OOD \x05N\x06IGHT \x051.31',
    goodnight13MapName: '\x02(\x0E4\x02)\x0EG\x02OOD \x0EN\x02IGHT',
    eclipseMapName: '\x07E\x06clipse \x051.2',
    ascensionMapName: '\x02A\x06scension \x051.0'
  },
  outputString: {
    polypoidMapName: `<span style="font-color: #fc0000;">Polyp</span><span style="font-color: #ffffff;">oid </span><span style="font-color: #ffffff;">1</span><span style="font-color: #4cc428;">.65</span>`,
    polypoidMapDescription: `<span style="font-color: #b4fc74;">Usually harmless.\r\n</span><span style="font-color: #b4fc74;">However, there is a small risk of </span><span style="font-color: #fc0000;">malignancy.\r\n\r\nCreated by KM-\r\nReleased 2021.3.11.</span>`,
    lemonMapName: `<span style="font-color: #fc0000;">L</span><span style="font-color: #b4fc74;">emon </span><span style="font-color: #585858;">0.95</span>`,
    goodnight131MapName: `<span style="font-color: #585858;">G</span><span style="font-color: #ffffff;">OOD </span><span style="font-color: #585858;">N</span><span style="font-color: #ffffff;">IGHT </span><span style="font-color: #585858;">1.31</span>`,
    goodnight13MapName: '<span style="font-color: #a4b4f8;">(</span><span class="invalid">4</span><span style="font-color: #a4b4f8;">)</span><span class="invalid">G</span><span style="font-color: #a4b4f8;">OOD </span><span class="invalid">N</span><span style="font-color: #a4b4f8;">IGHT</span>',
    eclipseMapName: `<span style="font-color: #fc0000;">E</span><span style="font-color: #ffffff;">clipse </span><span style="font-color: #585858;">1.2</span>`,
    ascensionMapName: `<span style="font-color: #a4b4f8;">A</span><span style="font-color: #ffffff;">scension </span><span style="font-color: #585858;">1.0</span>`
  },
  outputObject: {
    polypoidMapName: [{type:'briefingRed',color:'#fc0000'},{char:'P'},{char:'o'},{char:'l'},{char:'y'},{char:'p'},{type:'briefingWhite',color:'#ffffff'},{char:'o'},{char:'i'},{char:'d'},{char:' '},{type:'briefingWhite',color:'#ffffff'},{char:'1'},{type:'briefingGreen',color:'#4cc428'},{char:'.'},{char:'6'},{char:'5'}],
    polypoidMapDescription: [{type:'briefingLightGreen',color:'#b4fc74'},{char:'U'},{char:'s'},{char:'u'},{char:'a'},{char:'l'},{char:'l'},{char:'y'},{char:' '},{char:'h'},{char:'a'},{char:'r'},{char:'m'},{char:'l'},{char:'e'},{char:'s'},{char:'s'},{char:'.'},{char:'\r'},{char:'\n'},{type:'briefingLightGreen',color:'#b4fc74'},{char:'H'},{char:'o'},{char:'w'},{char:'e'},{char:'v'},{char:'e'},{char:'r'},{char:','},{char:' '},{char:'t'},{char:'h'},{char:'e'},{char:'r'},{char:'e'},{char:' '},{char:'i'},{char:'s'},{char:' '},{char:'a'},{char:' '},{char:'s'},{char:'m'},{char:'a'},{char:'l'},{char:'l'},{char:' '},{char:'r'},{char:'i'},{char:'s'},{char:'k'},{char:' '},{char:'o'},{char:'f'},{char:' '},{type:'briefingRed',color:'#fc0000'},{char:'m'},{char:'a'},{char:'l'},{char:'i'},{char:'g'},{char:'n'},{char:'a'},{char:'n'},{char:'c'},{char:'y'},{char:'.'},{char:'\r'},{char:'\n'},{char:'\r'},{char:'\n'},{char:'C'},{char:'r'},{char:'e'},{char:'a'},{char:'t'},{char:'e'},{char:'d'},{char:' '},{char:'b'},{char:'y'},{char:' '},{char:'K'},{char:'M'},{char:'-'},{char:'\r'},{char:'\n'},{char:'R'},{char:'e'},{char:'l'},{char:'e'},{char:'a'},{char:'s'},{char:'e'},{char:'d'},{char:' '},{char:'2'},{char:'0'},{char:'2'},{char:'1'},{char:'.'},{char:'3'},{char:'.'},{char:'1'},{char:'1'},{char:'.'}],
    lemonMapName: [{type:'briefingRed',color:'#fc0000'},{char:'L'},{type:'briefingLightGreen',color:'#b4fc74'},{char:'e'},{char:'m'},{char:'o'},{char:'n'},{char:' '},{type:'briefingGray',color:'#585858'},{char:'0'},{char:'.'},{char:'9'},{char:'5'}],
    goodnight131MapName: [{type:'briefingGray',color:'#585858'},{char:'G'},{type:'briefingWhite',color:'#ffffff'},{char:'O'},{char:'O'},{char:'D'},{char:' '},{type:'briefingGray',color:'#585858'},{char:'N'},{type:'briefingWhite',color:'#ffffff'},{char:'I'},{char:'G'},{char:'H'},{char:'T'},{char:' '},{type:'briefingGray',color:'#585858'},{char:'1'},{char:'.'},{char:'3'},{char:'1'}],
    goodnight13MapName: [{type:'briefingPaleBlue',color:'#a4b4f8'},{char:'('},{char:14,type:'INVALID'},{char:'4'},{type:'briefingPaleBlue',color:'#a4b4f8'},{char:')'},{char:14,type:'INVALID'},{char:'G'},{type:'briefingPaleBlue',color:'#a4b4f8'},{char:'O'},{char:'O'},{char:'D'},{char:' '},{char:14,type:'INVALID'},{char:'N'},{type:'briefingPaleBlue',color:'#a4b4f8'},{char:'I'},{char:'G'},{char:'H'},{char:'T'}],
    eclipseMapName: [{type:'briefingRed',color:'#fc0000'},{char:'E'},{type:'briefingWhite',color:'#ffffff'},{char:'c'},{char:'l'},{char:'i'},{char:'p'},{char:'s'},{char:'e'},{char:' '},{type:'briefingGray',color:'#585858'},{char:'1'},{char:'.'},{char:'2'}],
    ascensionMapName: [{type:'briefingPaleBlue',color:'#a4b4f8'},{char:'A'},{type:'briefingWhite',color:'#ffffff'},{char:'s'},{char:'c'},{char:'e'},{char:'n'},{char:'s'},{char:'i'},{char:'o'},{char:'n'},{char:' '},{type:'briefingGray',color:'#585858'},{char:'1'},{char:'.'},{char:'0'}]
  }
}

const testFixtureNames = Object.keys(testFixtures.input)

/**
 * HTML wrapper factory.
 * 
 * This is a simple testing wrapper factory. It outputs basic HTML.
 */
const htmlWrapperFactory = (name, data) => {
  if (data.type === 'INVALID') {
    return str => `<span class="invalid">${str}</span>`
  }
  if (data.type === 'INVISIBLE') {
    return str => `<span style="color: transparent;">${str}</span>`
  }
  if (data.type === 'RIGHT_ALIGN') {
    return str => `<div style="text-align: right;">${str}</div>`
  }
  if (data.type === 'CENTER_ALIGN') {
    return str => `<div style="text-align: center;">${str}</div>`
  }
  if (data.type === 'NO_OP' || !data.color) {
    return str => str
  }
  return str => `<span style="font-color: ${data.color};">${str}</span>`
}

describe(`color conversion functions`, () => {
  describe(`createTextConverter()`, () => {
    it(`returns a converter object capable of outputting converted strings`, () => {
      const htmlConverter = createTextConverter(htmlWrapperFactory)
      for (const testItem of testFixtureNames) {
        expect(htmlConverter.convertMapName(testFixtures.input[testItem])).toBe(testFixtures.outputString[testItem])
      }
    })
  })
  describe(`convertMapName()`, () => {
    it(`returns an object of control codes and characters`, () => {
      for (const testItem of testFixtureNames) {
        expect(convertMapName(testFixtures.input[testItem])).toStrictEqual(testFixtures.outputObject[testItem])
      }
    })
  })
  describe(`convertIngameText()`, () => {
    it(`returns an object of control codes and characters`, () => {
      for (const testItem of testFixtureNames) {
        expect(convertMapName(testFixtures.input[testItem])).toStrictEqual(testFixtures.outputObject[testItem])
      }
    })
  })
})
