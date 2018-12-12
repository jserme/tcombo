/* eslint-env mocha */
const parse = require('../lib/parse')
const assert = require('assert')

const assertArray = function (a, b) {
  return a.every((v, index) => b[index] === v)
}

describe('parse', function () {
  it('unvalid return null', function () {
    assert(parse('/abc/def/ggg/helo/') === null)
  })

  it('single component single resource', function () {
    assert(assertArray(parse('/a.js').files, ['/a.js']))
    assert(assertArray(parse('/abc/a.js').files, ['/abc/a.js']))
    assert(assertArray(parse('a.js').files, ['a.js']))
    assert(assertArray(parse('abc.com/a.js?a.js').files, ['/a.js']))
    assert(parse('abc.com/a.js?a.js#sdjflsjf').domain === 'abc.com')
    assert(assertArray(parse('a.js?a.js').files, ['a.js']))
    assert(assertArray(parse('abc.com/a.js?a.js#sdjflsjf').files, ['/a.js']))
    assert(assertArray(parse('http://abc.com/a.js?a.js#sdjflsjf').files, ['/a.js']))
    assert(parse('http://abc.com/a.js?a.js#sdjflsjf').domain === 'abc.com')
    assert(assertArray(parse('//abc.com/a.js?a.js#sdjflsjf').files, ['/a.js']))
    assert(parse('//abc.com/a.js?a.js#sdjflsjf').domain === 'abc.com')
    assert(assertArray(parse('a.js?a.js#sdjflsjf').files, ['a.js']))
    assert(assertArray(parse('a.js,b.js?a.js#sdjflsjf').files, ['a.js,b.js']))
  })

  it('single component multi resource', function () {
    assert(assertArray(parse('/??a.js,b.js').files, ['/a.js', '/b.js']))
    assert(assertArray(parse('??a.js,b.js').files, ['a.js', 'b.js']))
    assert(assertArray(parse('/abc/??a.js,b.js').files, ['/abc/a.js', '/abc/b.js']))
    assert(assertArray(parse('abc.com/??a.js,b.js').files, ['/a.js', '/b.js']))
    assert(parse('abc.com/??a.js,b.js').domain === 'abc.com')
    assert(assertArray(parse('??a.js?a.js').files, ['a.js']))
    assert(assertArray(parse('??a.js?a.js').files, ['a.js']))
    assert(assertArray(parse('//abc.com/abc/??a.js,b.js?a.js#sdjflsjf').files, ['/abc/a.js', '/abc/b.js']))
    assert(assertArray(parse('//abc.com/abc??a.js,b.js?a.js#sdjflsjf').files, ['/abc/a.js', '/abc/b.js']))
    assert(parse('//abc.com/abc/??a.js,b.js?a.js#sdjflsjf').domain === 'abc.com')
    assert(assertArray(parse('http://abc.com/abc/??a.js,b.js?a.js#sdjflsjf').files, ['/abc/a.js', '/abc/b.js']))
    assert(parse('http://abc.com/abc/??a.js,b.js?a.js#sdjflsjf').domain === 'abc.com')
    assert(assertArray(parse('a.js,b.js?a.js#sdjflsjf').files, ['a.js,b.js']))
    assert(assertArray(parse('http://localhost/??a.js?123%,b.js?456&input_encoding=utf-8').files, ['/a.js', '/b.js']))
    assert(assertArray(parse('http://localhost/??a.js&input_encoding=utf-8,b.js?456').files, ['/a.js']))
    assert(parse('http://localhost/??a.js&input_encoding=utf-8,b.js?456').domain === 'localhost')
  })

  it('multi component multi resource', function () {
    assert(assertArray(parse('/??abc/a.js,def/b.js').files, ['/abc/a.js', '/def/b.js']))
    assert(assertArray(parse('??abc/a.js,def/b.js').files, ['abc/a.js', 'def/b.js']))
    assert(assertArray(parse('/abc/??abc/a.js,def/b.js').files, ['/abc/abc/a.js', '/abc/def/b.js']))
    assert(assertArray(parse('abc.com/??abc/a.js,def/b.js').files, ['/abc/a.js', '/def/b.js']))
    assert(parse('abc.com/??abc/a.js,def/b.js').domain === 'abc.com')
    assert(assertArray(parse('??abd/a.js?a.js').files, ['abd/a.js']))
    assert(assertArray(parse('http://abc.com/abc/??abc/a.js,def/b.js?a.js#sdjflsjf').files, ['/abc/abc/a.js', '/abc/def/b.js']))
    assert(parse('//abc.com/abc/??abc/a.js,def/b.js?a.js#sdjflsjf').domain === 'abc.com')
    assert(assertArray(parse('abca.js,defb.js?a.js#sdjflsjf').files, ['abca.js,defb.js']))
  })
})
