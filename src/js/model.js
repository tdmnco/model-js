// Variables:
let cache = []
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
  constructor(data) {
    this._created = new Date().toISOString()
    this._data = data
    this._updateHooks = []

    for (let key of Object.keys(this._data)) {
      Object.defineProperty(this, key, {
        get: () => {
          return this._data[key]
        },

        set: (value) => {
          for (let hook of this._updateHooks) {
            hook(key, this._data[key], value)
          }

          this._data[key] = value

          return value
        }
      })
    }
  }

  static get(id) {
    id = (this.prototype.modelName || this.prototype.constructor.name) + '-' + id

    let instance = cache[id]

    if (!instance && persist) {
      instance = new this(JSON.parse(localStorage.getItem(id)))
    }

    return instance
  }

  onUpdate(hook) {
    this._updateHooks.push(hook)
  }

  save() {
    let id = (this.modelName || this.constructor.name) + '-' + this.id

    cache[id] = this

    if (persist) {
      localStorage.setItem(id, JSON.stringify(this._data))
    }
  }
}

// Exports:
export { Model }
