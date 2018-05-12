// Imports:
import { Model } from '../../src/js'

// Classes:
class Test extends Model {}

// Tests:
test('Create a new model', () => {
  expect(new Test({ id: '1' })).toBeDefined()
})

test('Get a model id', () => {
  expect(new Test({ id: '2' }).id).toBeDefined()
})
