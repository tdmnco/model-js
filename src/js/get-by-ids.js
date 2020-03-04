// Imports:
import * as cache from './cache'
import { className } from './class-name'

// Exports:
export function getByIds(type, query) {
  const cached = cache.get(className(type))
  const instances = []

  for (let id in cached) {
    const instance = cached[id].instance

    for (let id of query) {
      if (instance.id === id) {
        instances.push(instance)

        break
      }
    }
  }

  return instances
}