// Exports:
export function instanceOf(instance) {  
  return instance.constructor.prototype.modelName || instance.constructor.name
}