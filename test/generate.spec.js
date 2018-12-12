/* eslint-env mocha */
const generate = require('../lib/generate')
const assert = require('assert')
describe('generate', function () {
  it('single component single resource', function () {
    assert(generate(['a.js']) === 'a.js')
    assert(generate('a.js') === 'a.js')
    assert(generate(['a.js'], {
      domain: 'localhost'
    }) === 'localhost/a.js')

    assert(generate(['a.js'], {
      domain: 'localhost',
      protocol: 'https://'
    }) === 'https://localhost/a.js')
  })

  it('single component multi resource', function () {
    assert(generate(['a.js', 'a.js', 'b.js', 'b.js']) === '??a.js,b.js')
    assert(generate(['/a.js', 'b.js'], {
      domain: 'localhost'
    }) === 'localhost??a.js,b.js')

    assert(generate(['abc/a.js', 'abc/b.js'], {
      domain: 'localhost',
      protocol: 'https://'
    }) === 'https://localhost/abc??a.js,b.js')

    assert(generate(['/abc/a.js', '/abc/b.js'], {
      domain: 'localhost',
      protocol: 'https://'
    }) === 'https://localhost/abc??a.js,b.js')

    assert(generate(['/abc/m/a.js', '/abc/m/b.js'], {
      domain: 'localhost',
      protocol: 'https://'
    }) === 'https://localhost/abc/m??a.js,b.js')
  })

  it('multi component multi resource', function () {
    assert(generate(['abc/a.js', 'def/b.js']) === '??abc/a.js,def/b.js')
    assert(generate(['/abc/a.js', '/def/b.js'], {
      domain: 'localhost'
    }) === 'localhost??abc/a.js,def/b.js')

    assert(generate(['abc/a.js', 'def/b.js'], {
      domain: 'localhost',
      protocol: 'https://'
    }) === 'https://localhost??abc/a.js,def/b.js')

    assert(generate(['/abc/a.js', '/def/b.js', '/def/m/b.js'], {
      domain: 'localhost',
      protocol: 'https://'
    }) === 'https://localhost??abc/a.js,def/b.js,def/m/b.js')
  })
})
