// Imports:
import * as cache from './cache'
import { className } from './class-name'

// Exports:
export function getByProperties(type, query) {
  const cached = cache.get(className(type))
  const instances = []

  for (let id in cached) {
    const instance = cached[id].instance
    
    let match = true

    for (let property in query) {
      if (instance[property] !== query[property]) {
        match = false

        break
      }
    }

    if (match) {
      instances.push(instance)
    }
  }

  return instances
}