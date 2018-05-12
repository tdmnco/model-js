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
  constructor(data) {
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
    if (persist) {
      return new this(JSON.parse(localStorage.getItem((this.prototype.modelName || this.prototype.constructor.name) + '-' + id)))
    }
  }

  onUpdate(hook) {
    this._updateHooks.push(hook)
  }

  save() {
    if (persist) {
      localStorage.setItem((this.modelName || this.constructor.name) + '-' + this.id, JSON.stringify(this._data))
    }
  }
}

// Exports:
export { Model }
