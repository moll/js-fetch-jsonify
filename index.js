var assign = require("oolong").assign
var defaults = require("oolong").defaults
var CONTENT_TYPE ="application/json"
var CONTENT_TYPE_HEADER = /^content-type$/i

exports = module.exports = function(fetch) {
  return assign(exports.fetch.bind(null, fetch), fetch)
}

exports.fetch = function(fetch, url, opts) {
  if (opts && opts.json !== undefined) opts = exports.stringify(url, opts)
  return fetch(url, opts)
}

exports.stringify = function(url, opts) {
  opts = defaults({
    headers: addContentType(opts.headers),
    body: JSON.stringify(opts.json)
  }, opts)

  delete opts.json
  return opts
}

function addContentType(headers) {
  if (headers && hasContentType(headers)) return headers
  else return defaults({"Content-Type": CONTENT_TYPE}, headers)
}

function hasContentType(headers) {
  for (var name in headers) if (CONTENT_TYPE_HEADER.test(name)) return true
  return false
}
