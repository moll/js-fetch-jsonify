var assign = require("oolong").assign
var merge = require("oolong").merge

exports = module.exports = function(fetch) {
  return assign(exports.fetch.bind(null, fetch), fetch)
}

exports.fetch = function(fetch, url, opts) {
  if (opts != null && opts.json !== undefined) opts = merge({}, opts, {
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(opts.json)
  })

  return fetch(url, opts)
}
