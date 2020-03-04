// Imports:
import * as cache from './cache'
import { className } from './class-name'

// Exports:
export function getInstances(type) {
  const cached = cache.get(className(type))
  const instances = []
  
  for (let id in cached) {
    instances.push(cached[id].instance)
  }

  return instances
}