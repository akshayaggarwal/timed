process.env.NODE_ENV = 'test'

require('babel-register')()

const jsdom = require('jsdom').jsdom

const exposedProperties = ['window', 'navigator', 'document']

global.document = jsdom('')
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}

// documentRef = document // what is that

// Prevent mocha from interpreting CSS @import files
function noop() {
  return null
}

require.extensions['.css'] = noop
