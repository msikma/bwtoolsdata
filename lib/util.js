// sctoolsdata <https://github.com/msikma/sctoolsdata>
// © MIT license

/** Flips the keys/values of an object. */
const objectFlip = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]))

module.exports = {
  objectFlip
}
