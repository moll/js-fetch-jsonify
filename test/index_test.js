var Sinon = require("sinon")
var Fetch = require("./fetch")
var FetchJsonify = require("..")
var fetch = FetchJsonify(Fetch)
var URL = "https://example.com/models"

// Sinon appends charset to Content-Type:
// https://github.com/sinonjs/sinon/issues/607:
var JSON_TYPE = /^application\/json\b/

describe("FetchJsonify", function() {
  beforeEach(function() {
    var xhr = global.XMLHttpRequest = Sinon.FakeXMLHttpRequest
    xhr.onCreate = Array.prototype.push.bind(this.requests = [])
  })

  it("must return fetch with Headers, Request and Response", function() {
    fetch.Headers.must.equal(Fetch.Headers)
    fetch.Request.must.equal(Fetch.Request)
    fetch.Response.must.equal(Fetch.Response)
  })

  it("must request with JSON", function() {
    var body = {name: "John"}
    fetch(URL, {method: "POST", json: body})

    this.requests[0].method.must.equal("POST")
    this.requests[0].url.must.equal(URL)
    this.requests[0].requestHeaders["content-type"].must.match(JSON_TYPE)
    this.requests[0].requestBody.must.equal(JSON.stringify(body))
  })

  it("must request with given Content-Type", function() {
    var body = {name: "John"}
    var type = "application/vnd.foo+json"
    fetch(URL, {method: "POST", headers: {"Content-Type": type}, json: body})

    this.requests[0].method.must.equal("POST")
    this.requests[0].url.must.equal(URL)
    this.requests[0].requestHeaders["content-type"].must.include(type)
    this.requests[0].requestBody.must.equal(JSON.stringify(body))
  })

  // Even though it works right now, it depends on key insertion ordering.
  // Not a particularly robust approach.
  it("must request with given Content-Type if not capitalized", function() {
    var body = {name: "John"}
    var type = "application/vnd.foo+json"
    fetch(URL, {method: "POST", headers: {"content-type": type}, json: body})

    this.requests[0].method.must.equal("POST")
    this.requests[0].url.must.equal(URL)
    this.requests[0].requestHeaders["content-type"].must.include(type)
    this.requests[0].requestBody.must.equal(JSON.stringify(body))
  })

  it("must request with JSON if body given", function() {
    var body = {name: "John"}
    fetch(URL, {method: "POST", json: body, body: "Nope"})

    this.requests[0].method.must.equal("POST")
    this.requests[0].url.must.equal(URL)
    this.requests[0].requestHeaders["content-type"].must.match(JSON_TYPE)
    this.requests[0].requestBody.must.equal(JSON.stringify(body))
  })

  it("must request with JSON if null", function() {
    fetch(URL, {method: "POST", json: null})

    this.requests[0].method.must.equal("POST")
    this.requests[0].url.must.equal(URL)
    this.requests[0].requestHeaders["content-type"].must.match(JSON_TYPE)
    this.requests[0].requestBody.must.equal("null")
  })

  it("must not request with JSON if undefined", function() {
    fetch(URL, {method: "POST", json: undefined})

    this.requests[0].method.must.equal("POST")
    this.requests[0].url.must.equal(URL)
    this.requests[0].requestHeaders.must.be.empty()
    this.requests[0].must.have.property("requestBody", null)
  })

  it("must delete json property", function() {
    var spy = Sinon.spy(() => new Promise(() => {}))
    FetchJsonify(spy)("/", {json: {}})
    spy.callCount.must.equal(1)
    spy.firstCall.args[1].must.not.have.property("json")
  })

  it("must respond", function*() {
    var res = fetch(URL, {method: "POST", json: {name: "John"}})

    this.requests[0].respond(200, {}, "Hello")
    res = yield res
    res.status.must.equal(200)
    ;(yield res.text()).must.equal("Hello")
  })
})
