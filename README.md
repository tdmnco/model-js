# Model.js [![NPM Version](https://badge.fury.io/js/tdmnco-model-js.svg)](https://www.npmjs.com/package/tdmnco-model-js)

Model.js is a simple model layer for web applications.

Documentation is coming soon. In the meantime, here are some short notes:

1. In order to avoid uglifying model class names, set the `modelName` on the model class prototype like so: `Test.prototype.modelName = 'Test'`

## Change log

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
