// Exports:
export function tests(Model) {

  // Classes:
  class Test1 extends Model {}
  class Test2 extends Model {}
  class Test3 extends Model {}

  // Prototyping:
  Test2.prototype.modelName = 'Test2'
  Test3.prototype.storageType = 'sessionStorage'

  // Setup:
  beforeEach(() => {
    Test1.delete()
    Test2.delete()
    Test3.delete()
  })

  // Tests:
  test('Create new instance with string id', () => {
    expect(new Test1({ id: '1' })).toBeDefined()
  })

  test('Create new instance with integer id', () => {
    expect(new Test1({ id: 2 })).toBeDefined()
  })

  test('Cannot create new instance without id', () => {
    expect(() => {
      new Test1({ firstName: 'Kasper' })
    }).toThrow()
  })

  test('Get instance with string id', () => {
    new Test1({ id: '3' }).save()

    expect(Test1.get('3').id).toBe('3')
  })

  test('Get instance with integer id', () => {
    new Test1({ id: 4 }).save()

    expect(Test1.get(4).id).toBe(4)
  })
  
  test('Get instance with null id', () => {
    expect(Test1.get(null)).toBe(undefined)
  })

  test('Get model name from class', () => {
    expect(new Test1({ id: '5' }).constructor.name).toBe('Test1')
  })

  test('Get model name from modelName property', () => {
    expect(new Test2({ id: '6' }).modelName).toBe('Test2')
  })

  test('Get instance property with same name as model function', () => {
    expect(new Test1({ get: '7', id: '7' }).get).toBe('7')
  })
    
  test('Get instances via property query', () => {
    new Test1({ company: 'Tidemann&Co', id: '9', ownedBy: 'Kasper Tidemann' }).save()
    new Test1({ company: 'Alefarm Brewing', id: '10', ownedBy: 'Kasper Tidemann' }).save()

    expect(Test1.get({ ownedBy: 'Kasper Tidemann' }).length).toBe(2)
  })

  test('Get instances via array of ids', () => {
    new Test1({ id: '11' }).save()
    new Test1({ id: '12' }).save()
    new Test1({ id: '13' }).save()
    new Test1({ id: '14' }).save()

    expect(Test1.get(['11', '12', '13', '14']).length).toBe(4)
  })

  test('Get all instances', () => {
    new Test1({ id: '15' }).save()
    new Test1({ id: '16' }).save()
    new Test1({ id: '17' }).save()
    new Test1({ id: '18' }).save()
    new Test1({ id: '19' }).save()

    expect(Test1.get().length).toBe(5)
  })

  test('Get first instance via property query', () => {
    let test = new Test1({ bandName: 'Metallica', id: '20' })

    test.save()

    expect(Test1.first({ bandName: 'Metallica' }).id).toBe('20')
  })
  
  test('Get first instance via array of ids', () => {
    new Test1({ id: '21' }).save()
    new Test1({ id: '22' }).save()
    new Test1({ id: '23' }).save()

    expect(Test1.first(['21']).id).toBe('21')
  })

  test('Delete instance', () => {
    const test = new Test1({ id: '24' })

    test.save()

    test.delete()

    expect(Test1.get('24')).toBe(undefined)
  })

  test('Notify before constructor property update', () => {
    let test = new Test2({ id: '25' })

    test.onbeforeupdate((property, before, after) => {
      expect(property).toBe('id')
      expect(before).toBe('25')
      expect(after).toBe('26')
    })

    test.id = '26'
  })

  test('Notify on runtime property update', () => {
    let test = new Test1({ id: '27' })

    test.firstName = ''

    test.onbeforeupdate((property, before, after) => {
      expect(property).toBe('firstName')
      expect(before).toBe('')
      expect(after).toBe('Kasper')
    })

    test.firstName = 'Kasper'
  })

  test('Notify before instance deletion', () => {
    const callback = jest.fn()
    const test = new Test2({ id: '28' })

    test.onbeforedelete(callback)

    test.delete()

    expect(callback).toHaveBeenCalled()
  })

  test('JSON stringify comparison', () => {
    const now = new Date().toISOString()
    const test = new Test3({ created: now, firstname: 'Kasper', id: '29', lastname: 'Tidemann' })
    const json = { created: now, firstname: 'Kasper', id: '29', lastname: 'Tidemann' }

    expect(Object.keys(json)).toEqual(Object.keys(test))
    expect(JSON.stringify(test)).toEqual(JSON.stringify(json))
  })
  
  test('Load multiple instances using JSON payload', () => {
    Test1.loadJSON([
      {
        firstname: 'Kasper',
        id: '30',
        lastname: 'Tidemann'
      },
      {
        firstname: 'Britt',
        id: '31',
        lastname: 'van Slyck'
      },
      {
        firstname: 'Pepper',
        id: '32',
        lastname: 'van Slyck Tidemann'
      },
      {
        firstname: 'James',
        id: '33',
        lastname: 'van Slyck Tidemann'
      }
    ])

    expect(Test1.get('30').id).toBe('30')
    expect(Test1.get('31').id).toBe('31')
    expect(Test1.get('32').id).toBe('32')
    expect(Test1.get('33').id).toBe('33')
  })

  test('Load single instances using JSON payload', () => {
    Test3.loadJSON([
      {
        firstname: 'Kasper',
        id: '34',
        lastname: 'Tidemann'
      }
    ])

    expect(Test3.get('34').id).toBe('34')
  })

  test('Promise resolve on multiple instance load using JSON payload', async () => {
    await expect(Test1.loadJSON([
      {
        firstname: 'Kasper',
        id: '35',
        lastname: 'Tidemann'
      },
      {
        firstname: 'Britt',
        id: '36',
        lastname: 'van Slyck'
      },
      {
        firstname: 'Pepper',
        id: '37',
        lastname: 'van Slyck Tidemann'
      },
      {
        firstname: 'James',
        id: '38',
        lastname: 'van Slyck Tidemann'
      },
      {
        firstname: 'Anton',
        id: '39',
        lastname: 'van Slyck Tidemann'
      },
      {
        firstname: 'Georgina',
        id: '40',
        lastname: 'van Slyck Tidemann'
      }
    ])).resolves.toBe(6)
  })

}