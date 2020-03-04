// Imports:
import { instanceOf } from './instance-of'

// Constants:
const hooks = {}

// Functions:
function id(instance) {
  return instanceOf(instance) + instance.id
}

// Exports:
export function get(instance) {
  return hooks[id(instance)] || { onbeforedelete: [], onbeforeupdate: [] }
}

export function set(instance, type, callback) {
  const instanceId = id(instance)

  let hook = hooks[instanceId]

  if (!hook) {
    hooks[instanceId] = {
      onbeforedelete: [],
      onbeforeupdate: []
    }

    hook = hooks[instanceId]
  }

  hook[type].push(callback)
}