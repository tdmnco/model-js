// Imports:
import { instanceOf } from './instance-of'
import { className } from './class-name'

// Constants:
let cache = {}

// Exports:
export function clear(instance, all = false) {
  if (all) {
    for (let cached of instance.get()) {
      delete cache[className(instance)][cached.id]
    }
  } else {
    const type = cache[instanceOf(instance)]

    if (type) {
      delete type[instance.id]
    }
  }
}

export function get(model, query) {
  if (!cache[model]) {
    return undefined
  }

  if (query) {
    return cache[model][query] && cache[model][query].instance
  }
  
  return cache[model]
}

export function set(instance) {
  const id = instance.id
  const model = instanceOf(instance)
  const now = new Date().toISOString()
  
  if (!cache[model]) {
    cache[model] = {}
  }

  const cached = cache[model][id]
  
  if (!cached) {
    cache[model][id] = { created: now, instance }
  } else {
    cached.instance = instance
    cached.updated = now

    cache[model][id] = cached
  }
}
