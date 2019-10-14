# Changelog

All notable changes to this project will be documented in this file.

The format is based on a modified version of [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 0.6.5

### News

* Support for instances with integer ids.
* Improved test coverage.

## 0.6.4

### Bug fixes

* Properly detect when to resolve data loading.

## 0.6.3

### News

* Support for loading data into a model using `load()`.
* Return a promise when preloading data using `preload()`.
* Improved test coverage.

## 0.6.2

### News

* Replaces Parcel with Browserify + Babelify.

## 0.6.1

### Bug fixes

* Brings back Parcel along with some bundling changes.

## 0.6.0

### News

* Replaces Parcel with direct use of Babel and UglifyJS.

## 0.5.0

### News

* Code cleanup.
* Documentation updates.

## 0.4.0

### News

* Retires `thaw()`, `frozen()` and `freeze()` from the API.
* Documentation updates.

## 0.3.1

### News

* Adds support for callbacks before instance deletion.
* Improves test coverage.

## 0.3.0

### News

* Adds support for multiple model caches.
* Adds a `deleteCache()` function for deleting a model cache.
* Improves the `get()` function by splitting its responsibilities into separate functions depending on the query.
* Improves test coverage.

## 0.2.0

### News

* Adds a `freeze()` function for freezing an instance to prevent property updates.
* Adds a `thaw()` function for unfreezing an instance.
* Improves the `get()` functionality and makes it return `null` when getting instances that do not exist in the cache or in localStorage.
* Improves test coverage.

## 0.1.0

### News

* Adds a `first()` function for getting the first instance of a query.
* Improves test coverage.

## 0.0.9

### News

* Adds support for getting all instances without a query.
* Improves test coverage.

## 0.0.8

### Bug fixes

* Include the proper dist bundle in the release.

## 0.0.7

### News

* Adds support for preloading instances via localStorage.
* Adds support for getting instances via property values.
* Adds support for getting instances via an array of ids.
* Improves test coverage.

### Bug fixes

* Fixes the missing `testURL` that is required for jsdom version 11.12.0.

## 0.0.6

### News

* Replaces the use of `Object.defineProperty` in the model constructor in favor of `Proxy` for spying on properties added after an instance has been created.
* Optimizes the handling of callbacks on updates, so that the previous `_hooks` array is not persisted into `localStorage`.
* Improves test coverage.

## 0.0.5

### News

* Introduces an in-memory cache for speedy retrieval of data.
* Improves test coverage.

## 0.0.4

### News

* Support for update hooks via `instance.onupdate()`.
* Return model instances on static `get()` calls.
* Attempt to both read from and write to `localStorage` in order to decide if support is present.
* Support for setting the model name to be persisted in `localStorage` via `prototype.modelName`.
* Improves test coverage.

## 0.0.2

### News
* Support for `localStorage` if present.
* Improves test coverage.

## 0.0.1

### News

* Initial release.
