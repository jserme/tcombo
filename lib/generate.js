const CONST = require('./const')
const uniq = function (files) {
  var o = {}
  for (let file of files) {
    if (!o[file]) {
      o[file] = 1
    }
  }

  return Object.keys(o)
}

function generate (files, options = {}) {
  let rst = ''
  if (!Array.isArray(files)) {
    files = [files]
  }

  if (options.protocol) {
    rst += options.protocol
  }

  if (options.domain) {
    rst += options.domain
  }

  // clean first /
  files = files.map(f => f.replace(/^\//, ''))

  // uniq
  files = uniq(files)
  if (files.length === 1) {
    if (rst !== '') {
      rst += '/'
    }
    rst += files[0]
  } else {
    // if all the files is in one folder
    const first = files[0]
    const index = first.lastIndexOf(CONST.delimiter)
    let folder = ''
    if (index !== -1) {
      folder = first.slice(0, index)
    }

    let sameFolder = true
    for (let i = 1; i < files.length; i++) {
      const file = files[i]
      const curIndex = file.lastIndexOf(CONST.delimiter)
      let curFolder
      if (curIndex !== -1) {
        curFolder = file.slice(0, curIndex)
      }

      if (curFolder !== folder) {
        sameFolder = false
        break
      }
    }

    if (sameFolder) {
      rst += CONST.delimiter + folder + CONST.start +
                files
                  .map(v => v.replace(folder + CONST.delimiter, ''))
                  .join(CONST.splitter)
    } else {
      rst += CONST.start + files.join(CONST.splitter)
    }
  }

  // join the result
  return rst
}

module.exports = generate
