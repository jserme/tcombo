/* eslint-env mocha */
const tcombo = require('../')
const assert = require('assert')
describe('index', function () {
  it('parse & generate', function () {
    assert(typeof tcombo.parse === 'function')
    assert(typeof tcombo.generate === 'function')
  })
})
