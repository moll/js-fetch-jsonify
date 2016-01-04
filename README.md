FetchJSONify.js
===============
[![NPM version][npm-badge]](https://www.npmjs.com/package/fetch-jsonify)

Fetch JSONify is a mixin for the [Fetch API][fetch] for browsers and Node.js that stringifies JSON and sets the `Content-Type` header if not given. It's functional and immutable, in that it doesn't modify any properties given to it.

[npm-badge]: https://img.shields.io/npm/v/fetch-jsonify.svg
[fetch]: https://developer.mozilla.org/en/docs/Web/API/Fetch_API


Installing
----------
```sh
npm install fetch-jsonify
```

FetchJSONify.js follows [semantic versioning](http://semver.org), so feel free to depend on its major version with something like `>= 1.0.0 < 2` (a.k.a `^1.0.0`).


Using
-----
Wrap the native `fetch` function with the one from FetchJSONify.js:

```javascript
var fetchWithJsonify = require("fetch-jsonify")(fetch)
```

Then pass any value or object you'd like stringified under the `json` property:

```javascript
fetch("/models", {method: "POST", json: {name: "John"}})
```

That property will be stringified with `JSON.stringify` and passed on to the
original `fetch` function under the `body` property. The `Content-Type` header
will be set to `application/json` if it's not set.

### Content-Type
To set a custom `Content-Type` header, just pass it as you normally would:

```javascript
fetch("/models", {
  method: "POST",
  headers: {"Content-Type": "application/vnd.model+json"},
  json: {name: "John"}
})
```

### Browser
Browsers have the Fetch API available at `window.fetch`:

```javascript
var fetch = require("fetch-jsonify")(window.fetch)
fetch("/models", {method: "POST", json: {name: "John"}})
```

### Node.js
Node.js doesn't have a built-in implementation of the Fetch API, but you can use any library with a compatible interface, such as [node-fetch](https://github.com/bitinn/node-fetch):

```javascript
var fetch = require("fetch-jsonify")(require("node-fetch"))
fetch("/models", {method: "POST", json: {name: "John"}})
```


License
-------
FetchJSONify.js is released under a *Lesser GNU Affero General Public License*, which in summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g. bug-fixes) you've made to this program.

For more convoluted language, see the `LICENSE` file.


About
-----
**[Andri Möll][moll]** typed this and the code.  
[Monday Calendar][monday] supported the engineering work.

If you find FetchJSONify.js needs improving, please don't hesitate to type to me now at [andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/js-fetch-jsonify/issues
[moll]: http://themoll.com
[monday]: https://mondayapp.com
