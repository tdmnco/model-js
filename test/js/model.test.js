// Imports:
import { Model } from '../../src/js'

// Classes:
class Test extends Model {}

// Tests:
test('Create new instance', () => {
  expect(new Test({ id: '1' })).toBeDefined()
})

test('Get instance id', () => {
  expect(new Test({ id: '2' }).id).toBeDefined()
})

test('Get instance from localStorage', () => {
  new Test({ id: '3' })

  expect(Test.get('3').id).toBe('3')
})
