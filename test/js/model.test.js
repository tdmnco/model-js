// Imports:
import { Model } from '../../src/js'

// Classes:
class Test extends Model {}
class TestModelName extends Model {}

// Prototyping:
TestModelName.prototype.modelName = 'TestModelName'

// Tests:
test('Create new instance', () => {
  expect(new Test({ id: '1' })).toBeDefined()
})

test('Get instance id', () => {
  expect(new Test({ id: '2' }).id).toBeDefined()
})

test('Get instance from localStorage', () => {
  let test = new Test({ id: '3' })

  test.save()

  expect(Test.get('3').id).toBe('3')
})

test('Get model name from class', () => {
  expect(new Test({ id: '4' }).constructor.name).toBe('Test')
})

test('Get model name from modelName property', () => {
  expect(new TestModelName({ id: '5' }).modelName).toBe('TestModelName')
})

test('Notify on property update', () => {
  let test = new Test({ id: '6' })

  test.onUpdate((property, before, after) => {
    expect(property).toBe('id')
    expect(before).toBe('6')
    expect(after).toBe('7')
  })

  test.id = '7'
})

test('Get instance from cache', () => {
  let test = new Test({ id: '8' })

  test.save()

  let cachedTest = Test.get('8')

  expect(test._created).toBe(cachedTest._created)
})
