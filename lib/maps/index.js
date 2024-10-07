// bwtoolsdata <https://github.com/msikma/bwtoolsdata>
// © MIT license

import path from 'path'
import {fileURLToPath} from 'url'
import {createReadStream} from 'fs'
import fs from 'fs/promises'
import * as csv from '@fast-csv/parse'

/** Parsed map data. mapData.data contains {eng: string; kor: string}[] */
const mapData = {
  isLoaded: false,
  data: []
}

/**
 * Loads the map names CSV file and prepares it for use.
 * 
 * The first time this function runs, this loads the map-names.csv file and parses it.
 * Subsequent calls will do nothing. The data is stored in mapData.data.
 */
export const ensureMapData = () => {
  if (mapData.isLoaded) {
    return
  }
  const here = path.dirname(fileURLToPath(import.meta.url))
  return new Promise((resolve, reject) => {
    createReadStream(path.join(here, 'map-names.csv'))
      .pipe(csv.parse({headers: true}))
      .transform(async (row, next) => {
        const {eng, kor} = row
        mapData.data.push({eng, kor})
        next()
      })
      .on('finish', () => {
        mapData.isLoaded = true
        resolve()
      })
      .on('error', (err) => {
        mapData.data = []
        mapData.isLoaded = false
        reject(err)
      })
  })
}

/**
 * Returns the parsed map names.
 */
export const getMapNames = async () => {
  if (!mapData.isLoaded) {
    throw new Error('Map data is not loaded')
  }
  return mapData.data
}

/**
 * Returns the raw .csv file containing the map names.
 */
export const getMapNamesCSV = async () => {
  const here = path.dirname(fileURLToPath(import.meta.url))
  return fs.readFile(path.join(here, 'map-names.csv'), 'utf8')
}

/**
 * Returns the translated name for a given map.
 * 
 * Requires that the map data has been loaded.
 */
export const getTranslatedMapName = (originalName, fromLanguage, toLanguage) => {
  if (!mapData.isLoaded) {
    throw new Error('Map data is not loaded')
  }
  const row = mapData.data.find(item => item[fromLanguage] === originalName)
  if (row === undefined) {
    return null
  }
  return row[toLanguage]
}
