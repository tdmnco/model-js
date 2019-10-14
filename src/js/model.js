// Constants:
const cache = {}
const hooks = {}

// Variables:
let persist = true

try {
  localStorage.setItem('tdmnco-model-js', {})
  localStorage.removeItem('tdmnco-model-js')
} catch(error) {
  console.warn('Model.js: localStorage not supported!', error)

  persist = false
}

// Classes:
class Model {

  // Constructor:
  constructor(data) {
    if (!data.id) {
      throw new Error('Model.js: cannot create instance without an id!')
    }

    Object.assign(this, data)

    const modelName = this.constructor.prototype.modelName || this.constructor.name
    const id = this.id

    if (!cache[modelName]) {
      cache[modelName] = {}
    }

    if (!hooks[modelName]) {
      hooks[modelName] = {}
    }

    hooks[modelName][id] = {
      onbeforedelete: [],
      onbeforeupdate: []
    }

    return new Proxy(this, {
      get(target, property, receiver) {
				return Reflect.get(target, property, receiver)
      },

      set(target, property, value) {
        for (let callback of hooks[modelName][id].onbeforeupdate) {
          callback(property, target[property], value)
        }

        Reflect.set(target, property, value)

        return true
      }
    })
  }

  // Static functions:
  static cache() {
    return cache[this._modelName()]
  }

  static deleteCache() {
    cache[this._modelName()] = {}
  }

  static first(query) {
    return this.get(query)[0]
  }

  static get(query) {
    if (!query) {
      return this._getInstances()
    }

    if (/string|number/.test(typeof query)) {
      return this._getById(query)
    }

    if (query instanceof Array) {
      return this._getByIds(query)
    }

    if (query instanceof Object) {
      return this._getByProperties(query)
    }
  }

  static load(data) {
    return new Promise((resolve) => {
      const total = data && data.length

      if (total) {
        let count = 0

        for (let instance of data) {
          new this(instance).save()

          count++
          
          if (count === total) {
            resolve(count)
          }
        }
      } else {
        resolve()
      }
    })
  }

  static preload(options) {
    const modelName = this._modelName()
    const length = modelName.length

    return new Promise((resolve, reject) => {
      if (!options || options.localStorage) {
        const total = localStorage.length

        let count = 0
  
        for (let i = 0; i < total; i++) {
          let key = localStorage.key(i)
  
          if (key.slice(0, length) === modelName) {
            new this(JSON.parse(localStorage.getItem(key)))._cache()
          }

          count++

          if (count === total) {
            resolve(count)
          }
        }
      } else {
        reject(new Error('Model.js: no options given to ' + modelName + '.load()!'))
      }
    })
  }

  // Private static functions:
  static _getById(query) {
    const modelName = this._modelName()
    const cached = cache[modelName][query]

    if (cached) {
      return cached.instance
    }

    if (persist) {
      const stored = JSON.parse(localStorage.getItem(modelName + '-' + query))

      if (stored && stored.id) {
        return new this(stored)
      }
    }

    return null
  }

  static _getByIds(query) {
    const matches = []
    const modelName = this._modelName()

    for (let id in cache[modelName]) {
      const instance = cache[modelName][id].instance

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
    const matches = []
    const modelCache = cache[this._modelName()]

    for (let id in modelCache) {
      const instance = modelCache[id].instance
      
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
    const matches = []
    const modelCache = cache[this._modelName()]
    
    for (let id in modelCache) {
      matches.push(modelCache[id].instance)
    }

    return matches
  }

  static _modelName() {
    return this.prototype.modelName || this.prototype.constructor.name
  }

  // Private functions:
  _cache() {
    const now = new Date().toISOString()

    let cached = this._cached()

    if (!cached) {
      cached = { created: now, instance: this }

      cache[this._modelName()][this.id] = cached
    } else {
      cached.instance = this
      cached.updated = now
    }

    return cached
  }

  _cached() {
    return cache[this._modelName()][this.id]
  }

  _hook(type, callback) {
    hooks[this._modelName()][this.id][type].push(callback)
  }

  _id() {
    return this._modelName() + '-' + this.id
  }

  _modelName() {
    return this.constructor.prototype.modelName || this.constructor.name
  }

  // Public functions:
  delete() {
    const id = this.id
    const modelName = this._modelName()
    const onbeforedeletes = hooks[modelName][id].onbeforedelete

    if (onbeforedeletes.length) {
      for (let callback of onbeforedeletes) {
        callback()
      }
    }

    delete cache[modelName][id]
    delete hooks[modelName][id]

    if (persist) {
      localStorage.removeItem(this._id())
    }
  }

  onbeforedelete(callback) {
    this._hook('onbeforedelete', callback)
  }

  onbeforeupdate(callback) {
    this._hook('onbeforeupdate', callback)
  }

  save() {
    this._cache()

    if (persist) {
      localStorage.setItem(this._id(), JSON.stringify(this))
    }
  }
}

// Exports:
export default Model