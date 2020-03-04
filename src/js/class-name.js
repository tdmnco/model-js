// Exports:
export function className(type) {
  return type.prototype.modelName || type.prototype.constructor.name
}