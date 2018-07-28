# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.0.7] - 2018-07-28

### Added

* Adds support for preloading instances via localStorage.
* Adds support for getting instances via property values.
* Adds support for getting instances via an array of ids.
* Improved test coverage.

### Changed

* Fixes the missing `testURL` that is required for jsdom version 11.12.0.

## [0.0.6] - 2018-05-13

### Added

* Replaces the use of `Object.defineProperty` in the model constructor in favor of `Proxy` for spying on properties added after an instance has been created.
* Optimizes the handling of callbacks on updates, so that the previous `_hooks` array is not persisted into `localStorage`.
* Improved test coverage.

## [0.0.5] - 2018-05-13

### Added

* Introduces an in-memory cache for speedy retrieval of data.

### Changed

* Improved test coverage.

## [0.0.4] - 2018-05-12

### Added

* Support for update hooks via `instance.onupdate()`.
* Return model instances on static `get()` calls.
* Attempt to both read from and write to `localStorage` in order to decide if support is present.
* Support for setting the model name to be persisted in `localStorage` via `prototype.modelName`.
* Improved test coverage.

## [0.0.2] - 2018-05-12

### Added
* Support for `localStorage` if present.
* Improved test coverage.

## [0.0.1] - 2018-05-12

### Added

* Initial release.
