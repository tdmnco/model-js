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

test('Cannot create new instance without id', () => {
  expect(() => {
    new Test({ firstName: 'Kasper' })
  }).toThrow()
})

test('Get instance id', () => {
  expect(new Test({ id: '2' }).id).toBe('2')
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

test('Notify on constructor property update', () => {
  let test = new TestModelName({ id: '6' })

  test.onupdate((property, before, after) => {
    expect(property).toBe('id')
    expect(before).toBe('6')
    expect(after).toBe('7')
  })

  test.id = '7'
})

test('Notify on runtime property update', () => {
  let test = new Test({ id: '7' })

  test.firstName = ''

  test.onupdate((property, before, after) => {
    expect(property).toBe('firstName')
    expect(before).toBe('')
    expect(after).toBe('Kasper')
  })

  test.firstName = 'Kasper'
})

test('Get instance from cache', () => {
  let test = new Test({ id: '8' })

  test.save()

  let cachedTest1 = Test.get('8')

  test.description = 'Test description 1'

  test.save()

  test.description = 'Test description 2'

  test.save()

  let cachedTest2 = Test.get('8')

  expect(test.description).toBe(cachedTest1.description)
  expect(test.description).toBe(cachedTest2.description)
})

test('Get instance property with same name as model class', () => {
  expect(new Test({ get: '1', id: '9' }).get).toBe('1')
})

test('Get instance property with same name as model class', () => {
  localStorage.setItem('Test-10', JSON.stringify({ id: '10' }))

  Test.preload()

  expect(Test.cache()['Test-10'].instance.id).toBe('10')
})
