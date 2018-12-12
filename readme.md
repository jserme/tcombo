# tcombo
tengine combo url parser and generator 

## Useage

```javascript
const {parse, generate} = require('tcombo')
console.log(parse('http://localhost/abc??foo.js,bar.js'))
//{ domain: 'localhost', protocol:'http://', files: [ '/abc/foo.js', '/abc/bar.js' ] }

console.log(generate(['abc/d/foo.js', 'abc/d/bar.js']))
// /abc/d??foo.js,bar.js
```