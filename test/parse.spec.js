/* eslint-env mocha */
const parse = require('../lib/parse')
const assert = require('assert')

const assertRst = function (a, b) {
  return a.domain === b.domain &&
          a.protocol === b.protocol &&
          a.files.every((v, index) => b.files[index] === v)
}

describe('parse', function () {
  it('unvalid return null', function () {
    assert(parse('/abc/def/ggg/helo/') === null)
  })

  it('single component single resource', function () {
    assert(assertRst(parse('/a.js'), { domain: '', protocol: '', files: ['/a.js'] }))
    assert(assertRst(parse('/abc/a.js'), { domain: '', protocol: '', files: ['/abc/a.js'] }))
    assert(assertRst(parse('a.js'), { domain: '', protocol: '', files: ['a.js'] }))
    assert(assertRst(parse('abc.com/a.js?a.js'), { domain: 'abc.com', protocol: '', files: ['/a.js'] }))
    assert(assertRst(parse('a.js?a.js'), { domain: '', protocol: '', files: ['a.js'] }))
    assert(assertRst(parse('abc.com/a.js?a.js#sdjflsjf'), { domain: 'abc.com', protocol: '', files: ['/a.js'] }))
    assert(assertRst(parse('http://abc.com/a.js?a.js#sdjflsjf'), { domain: 'abc.com', protocol: 'http://', files: ['/a.js'] }))
    assert(assertRst(parse('//abc.com/a.js?a.js#sdjflsjf'), { domain: 'abc.com', protocol: '//', files: ['/a.js'] }))
    assert(assertRst(parse('a.js?a.js#sdjflsjf'), { domain: '', protocol: '', files: ['a.js'] }))
    assert(assertRst(parse('a.js,b.js?a.js#sdjflsjf'), { domain: '', protocol: '', files: ['a.js,b.js'] }))
  })

  it('single component multi resource', function () {
    assert(assertRst(parse('/??a.js,b.js'), { domain: '', protocol: '', files: ['/a.js', '/b.js'] }))
    assert(assertRst(parse('??a.js,b.js'), { domain: '', protocol: '', files: ['a.js', 'b.js'] }))
    assert(assertRst(parse('??abc/a.js,abc/b.js'), { domain: '', protocol: '', files: ['abc/a.js', 'abc/b.js'] }))
    assert(assertRst(parse('/abc/??a.js,b.js'), { domain: '', protocol: '', files: ['/abc/a.js', '/abc/b.js'] }))
    assert(assertRst(parse('abc.com/??a.js,b.js'), { domain: 'abc.com', protocol: '', files: ['/a.js', '/b.js'] }))
    assert(assertRst(parse('??a.js?a.js'), { domain: '', protocol: '', files: ['a.js'] }))
    assert(assertRst(parse('??a.js?a.js'), { domain: '', protocol: '', files: ['a.js'] }))
    assert(assertRst(parse('//abc.com/abc/??a.js,b.js?a.js#sdjflsjf'), { domain: 'abc.com', protocol: '//', files: ['/abc/a.js', '/abc/b.js'] }))
    assert(assertRst(parse('//abc.com/abc??a.js,b.js?a.js#sdjflsjf'), { domain: 'abc.com', protocol: '//', files: ['/abc/a.js', '/abc/b.js'] }))
    assert(assertRst(parse('http://abc.com/abc/??a.js,b.js?a.js#sdjflsjf'), { domain: 'abc.com', protocol: 'http://', files: ['/abc/a.js', '/abc/b.js'] }))
    assert(assertRst(parse('a.js,b.js?a.js#sdjflsjf'), { domain: '', protocol: '', files: ['a.js,b.js'] }))
    assert(assertRst(parse('http://localhost/??a.js?123%,b.js?456&input_encoding=utf-8'), { domain: 'localhost', protocol: 'http://', files: ['/a.js', '/b.js'] }))
    assert(assertRst(parse('http://localhost/??a.js&input_encoding=utf-8,b.js?456'), { domain: 'localhost', protocol: 'http://', files: ['/a.js'] }))
  })

  it('multi component multi resource', function () {
    assert(assertRst(parse('/??abc/a.js,def/b.js'), { domain: '', protocol: '', files: ['/abc/a.js', '/def/b.js'] }))
    assert(assertRst(parse('??abc/a.js,def/b.js'), { domain: '', protocol: '', files: ['abc/a.js', 'def/b.js'] }))
    assert(assertRst(parse('/abc/??abc/a.js,def/b.js'), { domain: '', protocol: '', files: ['/abc/abc/a.js', '/abc/def/b.js'] }))
    assert(assertRst(parse('abc.com/??abc/a.js,def/b.js'), { domain: 'abc.com', protocol: '', files: ['/abc/a.js', '/def/b.js'] }))
    assert(assertRst(parse('??abd/a.js?a.js'), { domain: '', protocol: '', files: ['abd/a.js'] }))
    assert(assertRst(parse('http://abc.com/abc/??abc/a.js,def/b.js?a.js#sdjflsjf'), { domain: 'abc.com', protocol: 'http://', files: ['/abc/abc/a.js', '/abc/def/b.js'] }))
    assert(assertRst(parse('abca.js,defb.js?a.js#sdjflsjf'), { domain: '', protocol: '', files: ['abca.js,defb.js'] }))
  })
})
