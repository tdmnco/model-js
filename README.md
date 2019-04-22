# Model.js [![NPM Version](https://badge.fury.io/js/tdmnco-model-js.svg)](https://www.npmjs.com/package/tdmnco-model-js)

- [What is Model.js?](#what-is-model-js)
- [Installation](#installation)
- [Documentation](#documentation)
  - [Prevent uglifying model names](#prevent-uglifying-model-names)
- [API](#api)
  - [new Model([contents])](#new-modelcontents)
  - [Model.cache()](#modelcache)
  - [Model.deleteCache()](#modeldeletecache)
  - [Model.first([query])](#modelfirstquery)
  - [Model.get([query])](#modelgetquery)
    - [Model.get([id])](#modelgetid)
    - [Model.get([ids])](#modelgetids)
    - [Model.get([query])](#modelgetquery-1)
    - [Model.get()](#modelget)
  - [Model.preload()](#modelpreload)
  - [instance.delete()](#instancedelete)
  - [instance.onbeforedelete([callback])](#instanceonbeforedeletecallback)
  - [instance.onbeforeupdate([callback])](#instanceonbeforeupdatecallback)
  - [instance.save()](#instancesave)
- [Getting Help](#getting-help)

## What is Model.js?

Model.js is a simple model layer for web applications. It supports a dynamic model definition scheme based on JSON properties.

It is used internally at Tidemann&Co for all our web applications that require a model layer in JavaScript.

[↑ Back to top](#modeljs-)

## Installation

Installation is done via npm:

```
$ npm install tdmnco-model-js
```

[↑ Back to top](#modeljs-)

## Documentation

Using Model.js is simple and easy. Consider the following example:

```javascript
import { Model } from 'tdmnco-model-js'

class Post extends Model {}

let post = new Post({
  author: '',
  content: 'I love cherries!',
  id: '1',
  title: 'A tribute to cherries'
})

post.author = 'Kasper Tidemann'

post.save()
```

[↑ Back to top](#modeljs-)

### Prevent uglifying model names

If you use Parcel, Webpack or a similar bundler, your model names will be uglified when minimized for production.

This results in data stored in `localStorage` with names like `i-1` and `y-2` instead of `Post-1` and `User-2`.

In order to prevent this, prototype the name of a given model:

```javascript
import { Model } from 'tdmnco-model-js'

class Post extends Model {}

Post.prototype.modelName = 'Post'

export { Post }
```

[↑ Back to top](#modeljs-)

### Build

Model.js makes use of [Parcel]() for building the distributable `index.js`. In order to build the project, issue the following command in your terminal:

```
$ npm run dist
```

![Example of building Model.js](https://raw.githubusercontent.com/tdmnco/model-js/master/src/gfx/npm-run-dist.gif)

[↑ Back to top](#modeljs-)

### Test

Model.js makes use of [Jest](https://facebook.github.io/jest/) for its test suite. In order to run the test suite, issue the following command in your terminal:

```
$ npm run test
```

![Example of testing Model.js](https://raw.githubusercontent.com/tdmnco/model-js/master/src/gfx/npm-run-test.gif)

[↑ Back to top](#modeljs-)

## API

Model.js exposes the following functions for working with models and instances. In the following, `Model` refers to the static class and `instance` refers to an instance of the model in question:

### new Model([contents])

Constructor used to create a new instance of a model:

```
new Car({
  id: '4',
  manufacturer: 'BMW',
  model: '530d'
})
```

[↑ Back to top](#modeljs-)

### Model.cache()

Function for returning the cached instances of a model:

```
let cachedInstances = Car.cache()
```

[↑ Back to top](#modeljs-)

### Model.deleteCache()

Function for deleting the cached instances of a model:

```
Car.deleteCache()
```

[↑ Back to top](#modeljs-)

### Model.first([query])

Function for getting the first instance of a model:

```
let car = Car.first()
```

The function can be called with a query in order to return the first instance that matches the query:

```
let band = new Band({
  bandName: 'Metallica',
  id: '17'
})

band.save()

let metallica = Band.first({ bandName: 'Metallica' })
```

[↑ Back to top](#modeljs-)

### Model.get([query])

Function for getting instances of a model. It supports getting an instance by passing an id, by passing an array of ids or by passing a query. Additionally, it supports getting all instances of a model by not passing any arguments to the function:

#### Model.get([id])

```
let apple = Apple.get('17')
```

[↑ Back to top](#modeljs-)

#### Model.get([ids])

```
let apples = Apple.get(['17', '18', '19'])
```

[↑ Back to top](#modeljs-)

#### Model.get([query])

```
let bmws = Car.get({ manufacturer: 'BMW' })
```

[↑ Back to top](#modeljs-)

#### Model.get()

```
let cars = Car.get()
```

[↑ Back to top](#modeljs-)

### Model.preload()

Function for preloading models from `localStorage` into the in-memory cache:

```
Cars.preload()
```

[↑ Back to top](#modeljs-)

### instance.delete()

Function for deleting an instance of a model from `localStorage` and from the in-memory cache:

```
let animal = new Animal({
  id: '392',
  type: 'rabbit'
})

animal.save()

animal.delete()
```

[↑ Back to top](#modeljs-)

### instance.onbeforedelete([callback])

Function for adding a callback to the deletion of an instance, calling the callback function before the instance is deleted:

```
let phone = new Phone({
  brand: 'iPhone'
  id: '944',
  model: 'X'
})

phone.onbeforedelete(() => {
  alert('Instance will be deleted now!')
})
```

[↑ Back to top](#modeljs-)

### instance.onbeforeupdate([callback])

Function for adding a callback to the update of an instance property, calling the callback function before the property is updated:

```
let phone = Phone.get('944')

phone.onbeforeupdate((property, before, after) => {
  console.log(property + ' is ' + before + ' but will be changed to ' + after)
})
```

[↑ Back to top](#modeljs-)

### instance.save()

Function for saving an instance of a model to the cache. The instance will also be saved to `localStorage` if it is supported:

```
let building = new Building({
  id: '2359',
  type: 'house'
})

building.save()
```

[↑ Back to top](#modeljs-)

## Getting Help

We believe in an open and welcoming community for all. Please post your questions in the [Issues](https://github.com/tdmnco/model-js/issues) section here at GitHub or contact Kasper Tidemann directly at [kt@tdmn.co](kt@tdmn.co).

Note that if your question has general relevance, it might be worth sharing with others.

---

Thanks for reading!

🎁
