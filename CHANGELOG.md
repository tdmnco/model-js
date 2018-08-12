# Changelog

All notable changes to this project will be documented in this file.

The format is based on a modified version of [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 0.1.0

### News

* Adds a `first()` function for getting the first instance of a query.
* Improved test coverage.

## 0.0.9

### News

* Adds support for getting all instances without a query.
* Improved test coverage.

## 0.0.8

### Bug fixes

* Include the proper dist bundle in the release.

## 0.0.7

### News

* Adds support for preloading instances via localStorage.
* Adds support for getting instances via property values.
* Adds support for getting instances via an array of ids.
* Improved test coverage.

### Bug fixes

* Fixes the missing `testURL` that is required for jsdom version 11.12.0.

## 0.0.6

### News

* Replaces the use of `Object.defineProperty` in the model constructor in favor of `Proxy` for spying on properties added after an instance has been created.
* Optimizes the handling of callbacks on updates, so that the previous `_hooks` array is not persisted into `localStorage`.
* Improved test coverage.

## 0.0.5

### News

* Introduces an in-memory cache for speedy retrieval of data.
* Improved test coverage.

## 0.0.4

### News

* Support for update hooks via `instance.onupdate()`.
* Return model instances on static `get()` calls.
* Attempt to both read from and write to `localStorage` in order to decide if support is present.
* Support for setting the model name to be persisted in `localStorage` via `prototype.modelName`.
* Improved test coverage.

## 0.0.2

### News
* Support for `localStorage` if present.
* Improved test coverage.

## 0.0.1

### News

* Initial release.