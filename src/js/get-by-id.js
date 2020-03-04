// Imports:
import * as cache from './cache'
import { className } from './class-name'

// Exports:
export function getById(type, query) {  
  return cache.get(className(type), query)
}