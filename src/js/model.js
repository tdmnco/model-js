// Imports:
import * as cache from './cache'
import * as hooks from './hooks'
import { getById } from './get-by-id'
import { getByIds } from './get-by-ids'
import { getByProperties } from './get-by-properties'
import { getInstances } from './get-instances'

// Classes:
class Model {

  // Constructor:
  constructor(data) {
    if (!data.id) {
      throw new Error('Model.js: cannot create instance without an id!')
    }

    Object.assign(this, data)

    new Proxy(this, {
      get(target, property, receiver) {
				return Reflect.get(target, property, receiver)
      },

      set(target, property, value) {
        for (let callback of hooks.get(this).onbeforeupdate) {
          callback(property, target[property], value)
        }

        return Reflect.set(target, property, value)
      }
    })

    return this
  }

  // Static functions:
  static delete() {    
    cache.clear(this, true)
  }

  static first(query) {
    return this.get(query)[0]
  }

  static get(query) {
    const type = typeof query

    if (type === 'undefined') {
      return getInstances(this)
    }

    if (/string|number/.test(type)) {
      return getById(this, query)
    }

    if (query instanceof Array && query.length > 0) {
      return getByIds(this, query)
    }

    if (query instanceof Object) {
      return getByProperties(this, query)
    }

    return undefined
  }

  static loadJSON(items) {
    return new Promise((resolve) => {
      const total = items && items.length

      if (total) {
        let count = 0

        for (let item of items) {
          new this(item).save()

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

  // Public functions:
  delete() {
    for (let callback of hooks.get(this).onbeforedelete) {
      callback()
    }

    cache.clear(this)
  }

  onbeforedelete(callback) {
    hooks.set(this, 'onbeforedelete', callback)
  }

  onbeforeupdate(callback) {
    hooks.set(this, 'onbeforeupdate', callback)
  }

  save() {
    cache.set(this)
  }
}

// Exports:
export default Model