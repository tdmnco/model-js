// Imports:
import Model from '../../dist/js/model.js'

// Classes:
class Test1 extends Model {}
class Test2 extends Model {}
class Test3 extends Model {}

// Prototyping:
Test2.prototype.modelName = 'Test2'

// Setup:
afterEach(() => {
  Test1.deleteCache()
  Test2.deleteCache()
  Test3.deleteCache()
})

// Tests:
test('Create new instance with string id', () => {
  expect(new Test1({ id: '1' })).toBeDefined()
})

test('Create new instance with integer id', () => {
  expect(new Test1({ id: 1 })).toBeDefined()
})

test('Cannot create new instance without id', () => {
  expect(() => {
    new Test1({ firstName: 'Kasper' })
  }).toThrow()
})

test('Get instance with string id', () => {
  new Test1({ id: '1' }).save()

  expect(Test1.get('1').id).toBe('1')
})

test('Get instance with integer id', () => {
  new Test1({ id: 1 }).save()

  expect(Test1.get(1).id).toBe(1)
})

test('Get instance from localStorage', () => {
  new Test1({ id: '1' }).save()

  expect(Test1.get('1').id).toBe('1')
})

test('Get model name from class', () => {
  expect(new Test1({ id: '1' }).constructor.name).toBe('Test1')
})

test('Get model name from modelName property', () => {
  expect(new Test2({ id: '1' }).modelName).toBe('Test2')
})

test('Notify before constructor property update', () => {
  let test = new Test2({ id: '1' })

  test.onbeforeupdate((property, before, after) => {
    expect(property).toBe('id')
    expect(before).toBe('1')
    expect(after).toBe('2')
  })

  test.id = '2'
})

test('Notify on runtime property update', () => {
  let test = new Test1({ id: '1' })

  test.firstName = ''

  test.onbeforeupdate((property, before, after) => {
    expect(property).toBe('firstName')
    expect(before).toBe('')
    expect(after).toBe('Kasper')
  })

  test.firstName = 'Kasper'
})

test('Get instance from cache', () => {
  let test = new Test1({ id: '1' })

  test.save()

  let cachedTest1 = Test1.get('1')

  test.description = 'Test description 1'

  test.save()

  test.description = 'Test description 2'

  test.save()

  let cachedTest2 = Test1.get('1')

  expect(test.description).toBe(cachedTest1.description)
  expect(test.description).toBe(cachedTest2.description)
})

test('Get instance property with same name as model function', () => {
  expect(new Test1({ get: '1', id: '1' }).get).toBe('1')
})

test('Preload instance from localStorage', () => {
  localStorage.setItem('Test1-1', JSON.stringify({ id: '1' }))

  Test1.preload()

  expect(Test1.cache()['1'].instance.id).toBe('1')
})

test('Promise resolve on instance preload from localStorage', async () => {
  localStorage.setItem('Test1-2', JSON.stringify({ id: '2' }))

  await expect(Test1.preload()).resolves.toBe(2)
})

test('Get instances via property query', () => {
  new Test1({ company: 'Tidemann&Co', id: '1', ownedBy: 'Kasper Tidemann' }).save()
  new Test1({ company: 'Alefarm Brewing', id: '2', ownedBy: 'Kasper Tidemann' }).save()

  expect(Test1.get({ ownedBy: 'Kasper Tidemann' }).length).toBe(2)
})

test('Get instances via array of ids', () => {
  new Test1({ id: '1' }).save()
  new Test1({ id: '2' }).save()
  new Test1({ id: '3' }).save()
  new Test1({ id: '4' }).save()

  expect(Test1.get(['2', '3', '4']).length).toBe(3)
})

test('Get all instances', () => {
  new Test1({ id: '1' }).save()
  new Test1({ id: '2' }).save()
  new Test1({ id: '3' }).save()
  new Test1({ id: '4' }).save()
  new Test1({ id: '5' }).save()

  expect(Test1.get().length).toBe(5)
})

test('Get first instance via property query', () => {
  let test = new Test1({ bandName: 'Metallica', id: '1' })

  test.save()

  expect(Test1.first({ bandName: 'Metallica' }).id).toBe('1')
})

test('Get first instance via array of ids', () => {
  new Test1({ id: '1' }).save()
  new Test1({ id: '2' }).save()
  new Test1({ id: '3' }).save()

  expect(Test1.first(['1']).id).toBe('1')
})

test('Delete instance', () => {
  let test = new Test1({ id: '1' })

  test.save()

  test.delete()

  expect(Test1.get('1')).toBe(null)
})

test('Get caches for three separate models', () => {
  new Test1({ id: '1' }).save()
  new Test2({ id: '2' }).save()
  new Test3({ id: '3' }).save()

  expect(Object.keys(Test1.cache()).length).toBe(1)
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

  let test = new Test2({ id: '1' })

  test.onbeforedelete(callback)

  test.delete()

  expect(callback).toHaveBeenCalled()
})

test('JSON stringify comparison', () => {
  const now = new Date().toISOString()
  const test = new Test3({ created: now, firstname: 'Kasper', id: '1', lastname: 'Tidemann' })
  const json = { created: now, firstname: 'Kasper', id: '1', lastname: 'Tidemann' }

  expect(Object.keys(json)).toEqual(Object.keys(test))
  expect(JSON.stringify(test)).toEqual(JSON.stringify(json))
})

test('Load multiple instances using data payload', () => {
  Test1.load([
    {
      firstname: 'Kasper',
      id: '1',
      lastname: 'Tidemann'
    },
    {
      firstname: 'Britt',
      id: '2',
      lastname: 'van Slyck'
    },
    {
      firstname: 'Pepper',
      id: '3',
      lastname: 'van Slyck Tidemann'
    },
    {
      firstname: 'James',
      id: '4',
      lastname: 'van Slyck Tidemann'
    }
  ])

  expect(Test1.get().length).toBe(4)
})

test('Promise resolve on multiple instance load using data payload', async () => {
  await expect(Test1.load([
    {
      firstname: 'Kasper',
      id: '1',
      lastname: 'Tidemann'
    },
    {
      firstname: 'Britt',
      id: '2',
      lastname: 'van Slyck'
    },
    {
      firstname: 'Pepper',
      id: '3',
      lastname: 'van Slyck Tidemann'
    },
    {
      firstname: 'James',
      id: '4',
      lastname: 'van Slyck Tidemann'
    }
  ])).resolves.toBe(4)
})

test('Load single instances using data payload', () => {
  Test3.load([
    {
      firstname: 'Kasper',
      id: '1',
      lastname: 'Tidemann'
    }
  ])

  expect(Test3.get().length).toBe(1)
})