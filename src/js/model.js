// Variables:
let persist = true

try {
  localStorage.setItem('1', {})
} catch(error) {
  console.warn('Model.js: localStorage not supported!', error)

  persist = false
}

// Classes:
class Model {
  constructor(data) {
    Object.assign(this, data)

    this.save()
  }

  static get(id) {
    if (persist) {
      return JSON.parse(localStorage.getItem(this.prototype.constructor.name + '-' + id))
    }
  }

  save() {
    if (persist) {
      localStorage.setItem(this.constructor.name + '-' + this.id, JSON.stringify(this))
    }
  }
}

// Exports:
export { Model }
