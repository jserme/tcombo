const CONST = require('./const')
function parse (url) {
  let path = url
  let domain = ''

  // clean #
  const fragmentIndex = path.indexOf(CONST.fragment)
  if (fragmentIndex !== -1) {
    path = path.slice(0, fragmentIndex)
  }

  // clean &
  const symbolIndex = path.indexOf(CONST.andSymbol)
  if (symbolIndex !== -1) {
    path = path.slice(0, symbolIndex)
  }

  const startIndex = path.indexOf(CONST.start)

  // get pure path
  let pathStartIndex = path.indexOf(CONST.delimiter)
  if (pathStartIndex !== -1) {
    if (path.charAt(pathStartIndex + 1) === '/') {
      // remove :// and //
      path = path.slice(pathStartIndex + 2)
      pathStartIndex = path.indexOf(CONST.delimiter)
    }

    domain = path.slice(0, pathStartIndex)
    if (startIndex === -1 || pathStartIndex < startIndex) {
      path = path.slice(pathStartIndex)
    }
  }

  // non file available
  if (path.charAt(path.length - 1) === CONST.delimiter) {
    return null
  }

  let files = []
  if (startIndex !== -1) {
    const baseAndFiles = path.split(CONST.start)
    let base = baseAndFiles[0]
    if (base && (base.charAt(base.length - 1) !== CONST.delimiter)) {
      base = base + '/'
    }

    files = baseAndFiles[1]
      .split(CONST.query)[0]
      .split(CONST.splitter)
      .map((file) => {
        return base + file
      })
  } else {
    files = [path.split(CONST.query)[0]]
  }

  return {
    domain,
    files
  }
}

module.exports = parse
