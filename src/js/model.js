// Variables:
let cache = []
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
  static get(id) {
    id = (this.prototype.modelName || this.prototype.constructor.name) + '-' + id

    let cached = cache[id]

    if (!cached && persist) {
      return new this(JSON.parse(localStorage.getItem(id)))
    }

    return cached.instance
  }

  // Private functions:
  _cache() {
    let cached = this._cached()
    let now = new Date().toISOString()

    if (!cached) {
      cached = { created: now, random: Math.random(), instance: this }

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
  onUpdate(callback) {
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
