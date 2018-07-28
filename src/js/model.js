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
  constructor(data, configuration) {
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
        let updates = notify[id].updates

        if (updates.length) {
          for (let update of updates) {
            update(property, target[property], value)
          }
        }

        Reflect.set(target, property, value)

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
      let instances = []

      for (let id in cache) {
        instances.push(cache[id].instance)
      }

      return instances
    }

    let queryType = typeof query

    if (queryType === 'string') {
      let id = (this.prototype.modelName || this.prototype.constructor.name) + '-' + query
      let cached = cache[id]

      if (!cached && persist) {
        return new this(JSON.parse(localStorage.getItem(id)))
      }

      return cached.instance
    }

    let isPropertiesQuery = query instanceof Object
    let isArrayOfIds = query instanceof Array
    let matches = []

    for (let cached in cache) {
      let instance = cache[cached].instance

      if (isPropertiesQuery && !isArrayOfIds) {
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
      } else if (isArrayOfIds) {
        for (let id of query) {
          if (instance.id === id) {
            matches.push(instance)

            break
          }
        }
      }
    }

    return matches
  }

  static cache() {
    return cache
  }

  static preload(options) {
    const modelName = this.prototype.modelName || this.prototype.constructor.name
    const length = modelName.length

    if (!options || options.localStorage) {
      const count = localStorage.length

      let instances = []

      for (let i = 0; i < count; i++) {
        let key = localStorage.key(i)

        if (key.slice(0, length) === modelName) {
          new this(JSON.parse(localStorage.getItem(key)))._cache()
        }
      }
    }
  }

  // Private functions:
  _cache() {
    let cached = this._cached()
    let now = new Date().toISOString()

    if (!cached) {
      cached = { created: now, instance: this }

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
  onupdate(callback) {
    notify[this._id()].updates.push(callback)
  }

  save() {
    this._cache()

    if (persist) {
      localStorage.setItem(this._id(), JSON.stringify(this))
    }
  }
}

// Exports:
export { Model }
