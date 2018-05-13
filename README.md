# Model.js [![NPM Version](https://badge.fury.io/js/tdmnco-model-js.svg)](https://www.npmjs.com/package/tdmnco-model-js)
==========

- [What is Model.js?](#what-is-model-js)
- [Installation](#installation)
- [Documentation](#documentation)
- [Getting Help](#getting-help)

## What is Model.js?

Model.js is a simple model layer for web applications. It supports a dynamic model definition scheme based on JSON properties.

It is used internally here at Tidemann&Co for all our web applications that require a model layer in JavaScript.

## Installation

Installation is done via npm:

```
$ npm install tdmnco-model-js
```

## Documentation

Using Model.js is simple and easy. Consider the following example:

### post-model.js

```
import { Model } from 'tdmnco-model-js'

class Post extends Model {}

export { Post }
```

### index.js

```
import { Post } from './post-model'

let post = new Post({
  content: 'I love cherries!',
  id: '1',
  title: 'A tribute to cherries'
})

post.save()
```

### Prevent uglifying model names

If you use Parcel, Webpack or a similar bundler, your model names will be uglified when minimized for production.

This results in data stored in `localStorage` with names like `i-1` and `y-2` instead of `Post-1` and `User-2`.

In order to prevent this, prototype the name of a given model:

```
import { Model } from 'tdmnco-model-js'

class Post extends Model {}

Post.prototype.modelName = 'Post'

export { Post }
```

### Build

Model.js makes use of [Parcel]() for building the distributable `index.js`. In order to build the project, issue the following command in your terminal:

```
$ npm run dist
```

![Example of building Model.js](https://raw.githubusercontent.com/tdmnco/model-js/master/src/gfx/npm-run-test.gif)

### Test

Model.js makes use of [Jest](https://facebook.github.io/jest/) for its test suite. In order to run the test suite, issue the following command in your terminal:

```
$ npm run test
```

![Example of testing Model.js](https://raw.githubusercontent.com/tdmnco/model-js/master/src/gfx/npm-run-test.gif)

## Getting Help

We believe in an open and welcoming community for all. Please post your questions in the [Issues](https://github.com/tdmnco/model-js/issues) section here at GitHub or contact Kasper Tidemann directly at [kt@tdmn.co](kt@tdmn.co).

Note that if your questions has general relevance, it might be worth sharing with others.

## Change log

### v0.0.5

#### News

* Introduces an in-memory cache for speedy retrieval of data.

#### Testing

* Improved test coverage.

### v0.0.4

#### News

* Support for update hooks via `instance.onUpdate()`.
* Return model instances on static `get()` calls.
* Attempt to both read from and write to `localStorage` in order to decide if support is present.
* Support for setting the model name to be persisted in `localStorage` via `prototype.modelName`.

#### Testing

* Improved test coverage.

### v0.0.2

#### News

* Support for `localStorage` if present.

#### Testing

* Improved test coverage.

### v0.0.1

#### News

* Initial release.

---

Thanks for reading!

🎁
