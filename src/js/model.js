// Variables:
let cache = {}
let persist = true
let notify = {}

try {
  localStorage.setItem('tdmnco-model-js', {})
  localStorage.removeItem('tdmnco-model-js')
} catch(error) {
  console.warn('Model.js: localStorage not supported!', error)

  persist = false
}

// Classes:
class Model {
  constructor(data) {
    if (!data.id) {
      throw new Error('Model.js: cannot create instance without an id!')
    }

    Object.assign(this, data)

    let id = (this.constructor.prototype.modelName || this.constructor.name) + '-' + this.id

    notify[id] = {
      updates: []
    }

    return new Proxy(this, {
      get(target, property, receiver) {
				return Reflect.get(target, property, receiver);
      },

      set(target, property, value) {
        if (!target.frozen()) {
          let updates = notify[id].updates

          if (updates.length) {
            for (let update of updates) {
              update(property, target[property], value)
            }
          }

          Reflect.set(target, property, value)
        }

        return true
      }
    })
  }

  // Static functions:
  static first(query) {
    return this.get(query)[0]
  }

  static get(query) {
    if (!query) {
      return this._getInstances()
    }

    if (typeof query === 'string') {
      return this._getById(query)
    }

    if (query instanceof Array) {
      return this._getByIds(query)
    }

    if (query instanceof Object) {
      return this._getByProperties(query)
    }
  }

  static cache() {
    return cache
  }

  static preload(options) {
    const modelName = this.prototype.modelName || this.prototype.constructor.name
    const length = modelName.length

    if (!options || options.localStorage) {
      const count = localStorage.length

      for (let i = 0; i < count; i++) {
        let key = localStorage.key(i)

        if (key.slice(0, length) === modelName) {
          new this(JSON.parse(localStorage.getItem(key)))._cache()
        }
      }
    }
  }

  // Private functions:
  static _getById(query) {
    let id = (this.prototype.modelName || this.prototype.constructor.name) + '-' + query
    let cached = cache[id]

    if (cached) {
      return cached.instance
    }

    if (persist) {
      let stored = JSON.parse(localStorage.getItem(id))

      if (stored && stored.id) {
        return new this(stored)
      }
    }

    return null
  }

  static _getByIds(query) {
    let matches = []

    for (let cached in cache) {
      let instance = cache[cached].instance

      for (let id of query) {
        if (instance.id === id) {
          matches.push(instance)

          break
        }
      }
    }

    return matches
  }

  static _getByProperties(query) {
    let matches = []

    for (let cached in cache) {
      let instance = cache[cached].instance
      let match = true

      for (let property in query) {
        if (instance[property] !== query[property]) {
          match = false

          break
        }
      }

      if (match) {
        matches.push(instance)
      }
    }

    return matches
  }

  static _getInstances() {
    let matches = []
    
    for (let id in cache) {
      matches.push(cache[id].instance)
    }

    return matches
  }

  _cache() {
    let cached = this._cached()
    let now = new Date().toISOString()

    if (!cached) {
      cached = { created: now, frozen: false, instance: this }

      cache[this._id()] = cached
    } else {
      cached.instance = this
      cached.updated = now
    }

    return cached
  }

  _cached() {
    return cache[this._id()]
  }

  _id() {
    return (this.modelName || this.constructor.name) + '-' + this.id
  }

  // Public functions:
  delete() {
    let id = this._id()

    delete cache[id]

    if (persist) {
      localStorage.removeItem(id)
    }
  }

  freeze() {
    this._cached().frozen = true
  }

  frozen() {
    if (!this._cached()) {
      return false
    }

    return this._cached().frozen
  }

  onupdate(callback) {
    notify[this._id()].updates.push(callback)
  }

  save() {
    this._cache()

    if (persist) {
      localStorage.setItem(this._id(), JSON.stringify(this))
    }
  }

  thaw() {
    this._cached().frozen = false
  }
}

// Exports:
export { Model }
