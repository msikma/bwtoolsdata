// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

const fs = require('fs').promises
const path = require('path')
const {parseMapName} = require('./index')

/** Base directory containing test data. */
const testBasedir = path.resolve(path.join(__dirname, '..', '..', 'test'))

/** Retrieves test data. */
const getTestData = async filename => {
  const data = JSON.parse(await fs.readFile(path.join(testBasedir, filename), 'utf8'))
  return data
}

describe(`map name parser`, () => {
  describe(`parseMapName()`, () => {
    it(`correctly parses map names`, async () => {
      const mapNames = (await getTestData('map-names.json')).mapNames
      for (const {dataRaw, dataParsed, filename} of mapNames) {
        const parsed = parseMapName(dataRaw)
        expect(parsed.plainName).toBe(dataParsed.plainName)
        expect(parsed.cleanName).toBe(dataParsed.cleanName)
        expect(parsed.version).toBe(dataParsed.version)
        expect(parsed.plainNameVersioned).toBe(dataParsed.plainNameVersioned)
        expect(parsed.cleanNameVersioned).toBe(dataParsed.cleanNameVersioned)
      }
    })
  })
})
