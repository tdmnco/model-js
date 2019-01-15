// Imports:
import { Model } from '../../src/js'

// Classes:
class Test1 extends Model {}
class Test2 extends Model {}
class Test3 extends Model {}

// Prototyping:
Test2.prototype.modelName = 'Test2'

// Tests:
test('Create new instance', () => {
  expect(new Test1({ id: '1' })).toBeDefined()
})

test('Cannot create new instance without id', () => {
  expect(() => {
    new Test1({ firstName: 'Kasper' })
  }).toThrow()
})

test('Get instance id', () => {
  expect(new Test1({ id: '2' }).id).toBe('2')
})

test('Get instance from localStorage', () => {
  new Test1({ id: '3' }).save()

  expect(Test1.get('3').id).toBe('3')
})

test('Get model name from class', () => {
  expect(new Test1({ id: '4' }).constructor.name).toBe('Test1')
})

test('Get model name from modelName property', () => {
  expect(new Test2({ id: '5' }).modelName).toBe('Test2')
})

test('Notify before constructor property update', () => {
  let test = new Test2({ id: '6' })

  test.onbeforeupdate((property, before, after) => {
    expect(property).toBe('id')
    expect(before).toBe('6')
    expect(after).toBe('7')
  })

  test.id = '7'
})

test('Notify on runtime property update', () => {
  let test = new Test1({ id: '7' })

  test.firstName = ''

  test.onbeforeupdate((property, before, after) => {
    expect(property).toBe('firstName')
    expect(before).toBe('')
    expect(after).toBe('Kasper')
  })

  test.firstName = 'Kasper'
})

test('Get instance from cache', () => {
  let test = new Test1({ id: '8' })

  test.save()

  let cachedTest1 = Test1.get('8')

  test.description = 'Test description 1'

  test.save()

  test.description = 'Test description 2'

  test.save()

  let cachedTest2 = Test1.get('8')

  expect(test.description).toBe(cachedTest1.description)
  expect(test.description).toBe(cachedTest2.description)
})

test('Get instance property with same name as model function', () => {
  expect(new Test1({ get: '1', id: '9' }).get).toBe('1')
})

test('Preload instance from localStorage', () => {
  localStorage.setItem('Test1-10', JSON.stringify({ id: '10' }))

  Test1.preload()

  expect(Test1.cache()['10'].instance.id).toBe('10')
})

test('Get instances via property query', () => {
  new Test1({ company: 'Tidemann&Co', id: '11', ownedBy: 'Kasper Tidemann' }).save()
  new Test1({ company: 'Alefarm Brewing', id: '12', ownedBy: 'Kasper Tidemann' }).save()

  expect(Test1.get({ ownedBy: 'Kasper Tidemann' }).length).toBe(2)
})

test('Get instances via array of ids', () => {
  new Test1({ id: '13' }).save()
  new Test1({ id: '14' }).save()
  new Test1({ id: '15' }).save()
  new Test1({ id: '16' }).save()

  expect(Test1.get(['14', '15', '16']).length).toBe(3)
})

test('Get all instances', () => {
  expect(Test1.get().length).toBe(9)
})

test('Get first instance via property query', () => {
  let test = new Test1({ bandName: 'Metallica', id: '17' })

  test.save()

  expect(Test1.first({ bandName: 'Metallica' }).id).toBe('17')
})

test('Get first instance via array of ids', () => {
  new Test1({ id: '18' }).save()
  new Test1({ id: '19' }).save()
  new Test1({ id: '20' }).save()

  expect(Test1.first(['19']).id).toBe('19')
})

test('Delete instance', () => {
  let test = new Test1({ id: '21' })

  test.save()

  test.delete()

  expect(Test1.get('21')).toBe(null)
})

test('Freeze and thaw instance', () => {
  let test = new Test1({ id: '22', name: 'Kasper' })

  test.save()

  test.freeze()

  test.name = 'Jazzper'

  expect(test.name).toBe('Kasper')

  test.thaw()

  test.name = 'Jazzper'

  expect(test.name).toBe('Jazzper')
})

test('Get caches for three separate models', () => {
  new Test1({ id: '23' }).save()
  new Test2({ id: '24' }).save()
  new Test3({ id: '25' }).save()

  expect(Object.keys(Test1.cache()).length).toBe(15)
  expect(Object.keys(Test2.cache()).length).toBe(1)
  expect(Object.keys(Test3.cache()).length).toBe(1)
})

test('Delete caches for three separate models', () => {
  Test1.deleteCache()
  Test2.deleteCache()
  Test3.deleteCache()

  expect(Object.keys(Test1.cache()).length).toBe(0)
  expect(Object.keys(Test2.cache()).length).toBe(0)
  expect(Object.keys(Test3.cache()).length).toBe(0)
})

test('Notify before instance deletion', () => {
  const callback = jest.fn()

  let test = new Test2({ id: '26' })

  test.onbeforedelete(callback)

  test.delete()

  expect(callback).toHaveBeenCalled()
})