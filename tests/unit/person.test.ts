import Person, {
  createPerson,
  deletePerson,
  getAllPersons,
  getPersonById,
  personTestData,
  updatePerson,
} from '../../src/api/model/person'

test('get all persons', () => {
  const result = getAllPersons(true)
  expect(result.isError()).toBeFalsy()
  expect(result.data).toEqual(personTestData)
  expect(result.error).toBeNull()
})

test('get valid person by id', () => {
  const id = 1
  const person = personTestData.find((p) => p.id === id)
  expect(person).not.toBeUndefined()
  if (person !== undefined) {
    const result = getPersonById(id, true)
    expect(result.isError()).toBeFalsy()
    expect(result.data).toEqual(person)
    expect(result.error).toBeNull()
  }
})

test('get error person by invalid id', () => {
  const invalidId = 100
  const result = getPersonById(invalidId, true)
  expect(result.isError()).toBeTruthy()
  expect(result.data).toEqual({})
  expect(result.error).toBe('Person not found')
})

test('create person', () => {
  const person: Person = {
    id: 0,
    firstname: 'Adnan',
    lastname: 'Sin',
    email: 'a.sin@mail.io',
    phone: '0174 663412',
    street: 'Laubstraße',
    street_number: '21a',
    city: 'Gindilingen',
    postcode: '67443',
    rental_start: '01.01.2016',
    rental_end: '31.12.2026',
    profile_image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256',
    interest_city_postcode: '74332',
    interest_city: 'Gutberg',
    interest_area: 'Nord',
    interest_room_count_min: 2,
    interest_room_count_max: 2,
    interest_size_min: 40,
    interest_size_max: 60,
    interest_level: 0,
    interest_bathtub: false,
    interest_shower: true,
    interest_bathroom_window: false,
    interest_kitchen: false,
    interest_balcony: false,
    interest_terrace: false,
    interest_basement: false,
    interest_price_min: 350,
    interest_price_max: 450,
  }
  const result = createPerson(person, true)
  expect(result.isError()).toBeFalsy()
  expect(result.data).toEqual(person)
  expect(result.data.id).toBeGreaterThanOrEqual(1)
  expect(result.error).toBeNull()
  expect(personTestData.find((p) => p.id === result.data.id)).toEqual(
    result.data
  )
})

test('update valid person', () => {
  const id = 10
  const person = personTestData.find((p) => p.id === id)
  expect(person).not.toBeUndefined()
  if (person != undefined) {
    const personUpdate = {
      id: id,
      firstname: 'Luisa',
      lastname: 'Grone',
      email: 'grone.luisa@mail.io',
      phone: '0174 663412',
      street: 'Laubstraße',
      street_number: '21a',
      city: 'Gindilingen',
      postcode: '67443',
      rental_start: '01.01.2016',
      rental_end: '31.12.2025',
      profile_image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256',
      interest_city_postcode: '74332',
      interest_city: 'Gutberg',
      interest_area: 'Nord',
      interest_room_count_min: 2,
      interest_room_count_max: 2,
      interest_size_min: 40,
      interest_size_max: 60,
      interest_level: 0,
      interest_bathtub: false,
      interest_shower: true,
      interest_bathroom_window: false,
      interest_kitchen: false,
      interest_balcony: false,
      interest_terrace: false,
      interest_basement: true,
      interest_price_min: 350,
      interest_price_max: 450,
    }

    const result = updatePerson(personUpdate, true)
    expect(result.isError()).toBeFalsy()
    expect(result.error).toBeNull()
    expect(result.data).toEqual(personUpdate)
    expect(result.data.id).toEqual(personUpdate.id)
    expect(result.data.id).toEqual(id)
    expect(personTestData.find((p) => p.id === id)).toEqual(personUpdate)
  }
})

test('update invalid user', () => {
  const invalidId = 100
  const person = {
    id: invalidId,
    firstname: 'Luisa',
    lastname: 'Grone',
    email: 'grone.luisa@mail.io',
    phone: '0174 663412',
    street: 'Laubstraße',
    street_number: '21a',
    city: 'Gindilingen',
    postcode: '67443',
    rental_start: '01.01.2016',
    rental_end: '31.12.2025',
    profile_image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256',
    interest_city_postcode: '74332',
    interest_city: 'Gutberg',
    interest_area: 'Nord',
    interest_room_count_min: 2,
    interest_room_count_max: 2,
    interest_size_min: 40,
    interest_size_max: 60,
    interest_level: 0,
    interest_bathtub: false,
    interest_shower: true,
    interest_bathroom_window: false,
    interest_kitchen: false,
    interest_balcony: false,
    interest_terrace: false,
    interest_basement: true,
    interest_price_min: 350,
    interest_price_max: 450,
  }
  const result = updatePerson(person, true)
  expect(result.isError()).toBeTruthy()
  expect(result.data).toEqual({})
  expect(result.error).toBe('Person not found')
})

test('delete person by id', () => {
  const id = 1
  const result = deletePerson(id, true)
  expect(result.isError()).toBeFalsy()
  expect(result.data).toBeTruthy()
  expect(result.error).toBeNull()
  const personDeleted = personTestData.find((p) => p.id === id)
  expect(personDeleted).toBeUndefined()
})

test('get error deleting person by invalid id', () => {
  const invalidId = 100
  const result = deletePerson(invalidId, true)
  expect(result.isError()).toBeTruthy()
  expect(result.data).toBeFalsy()
  expect(result.error).toBe('Person not found')
})
