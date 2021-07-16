import BackendResult from './result'
import { AXIOS } from '../backend'
import { copyObjectByValues } from '../util/utils'

export default interface Person {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  street: string
  street_number: string
  city: string
  postcode: string
  rental_start: string
  rental_end: string
  profile_image: string
  interest_city_postcode: string
  interest_city: string
  interest_area: string
  interest_room_count_min: number
  interest_room_count_max: number
  interest_size_min: number
  interest_size_max: number
  interest_level: number
  interest_bathtub: boolean
  interest_shower: boolean
  interest_bathroom_window: boolean
  interest_kitchen: boolean
  interest_balcony: boolean
  interest_terrace: boolean
  interest_basement: boolean
  interest_price_min: number
  interest_price_max: number
}

/**
 * Returns all Persons
 * @param useTestData Flag if temp test data should be used
 */
export const getAllPersons = (
  useTestData: boolean
): BackendResult<Person[]> => {
  const result: BackendResult<Person[]> = new BackendResult()
  if (useTestData) {
    result.data = copyObjectByValues(personTestData) as Person[]
  } else {
    AXIOS.get('/persons')
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          result.data = response.data
        } else {
          result.error = response.status.toString()
        }
      })
      .catch(({ response }) => {
        result.error = response.status.toString()
      })
  }
  return result
}

/**
 * Searches for a Person by its Id and returns it if found
 * @param id Id of Person to search for
 * @param useTestData Flag if temp test data should be used
 */
export const getPersonById = (
  id: number,
  useTestData: boolean
): BackendResult<Person> => {
  const result: BackendResult<Person> = new BackendResult()
  if (useTestData) {
    const person = personTestData.find((p) => p.id === id)
    if (person != undefined) {
      result.data = copyObjectByValues(person) as Person
    } else {
      result.error = 'Person not found'
    }
  } else {
    AXIOS.get('/persons?id=' + id)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          result.data = response.data
        } else {
          result.error = response.status.toString()
        }
      })
      .catch(({ response }) => {
        result.error = response.status.toString()
      })
  }
  return result
}

/**
 * Creates a new Person
 * @param person Person to create
 * @param useTestData Flag if temp test data should be used
 */
export const createPerson = (
  person: Person,
  useTestData: boolean
): BackendResult<Person> => {
  const result: BackendResult<Person> = new BackendResult()
  if (useTestData) {
    person.id = personTestData.length + 1
    personTestData.push(person)
    result.data = copyObjectByValues(person) as Person
  } else {
    AXIOS.post('/persons?id=', person)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          result.data = response.data
        } else {
          result.error = response.status.toString()
        }
      })
      .catch(({ response }) => {
        result.error = response.status.toString()
      })
  }
  return result
}

/**
 * Updates a Person
 * @param person Person to update
 * @param useTestData Flag if temp test data should be used
 */
export const updatePerson = (
  person: Person,
  useTestData: boolean
): BackendResult<Person> => {
  const result: BackendResult<Person> = new BackendResult()
  if (useTestData) {
    const personToUpdate = personTestData.find((p) => p.id === person.id)
    if (personToUpdate != undefined) {
      personTestData = personTestData.filter((p) => p.id !== person.id)
      personTestData.push(person)
      result.data = copyObjectByValues(person) as Person
    } else {
      result.error = 'Person not found'
    }
  } else {
    AXIOS.put('/persons?id=' + person.id, person)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          result.data = response.data
        } else {
          result.error = response.status.toString()
        }
      })
      .catch(({ response }) => {
        result.error = response.status.toString()
      })
  }
  return result
}

/**
 * Deletes a Person by a given id
 * @param id Id of Person to delete
 * @param useTestData Flag if temp test data should be used
 */
export const deletePerson = (
  id: number,
  useTestData: boolean
): BackendResult<boolean> => {
  const result: BackendResult<boolean> = new BackendResult()
  result.data = false
  if (useTestData) {
    const personToDelete = personTestData.find((a) => a.id === id)
    if (personToDelete !== undefined) {
      personTestData = personTestData.filter((a) => a.id !== id)
      result.data = true
    } else {
      result.error = 'Person not found'
    }
  } else {
    AXIOS.delete('/persons?id=' + id)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          result.data = true
        } else {
          result.error = response.status.toString()
        }
      })
      .catch(({ response }) => {
        result.error = response.status.toString()
      })
  }
  return result
}

export let personTestData: Person[] = [
  {
    id: 1,
    firstname: 'Gustav',
    lastname: 'Jonson',
    email: 'gustav.jonson@mail.net',
    phone: '0176 556754',
    street: 'Bahnstraße',
    street_number: '17',
    city: 'Gutberg',
    postcode: '74332',
    rental_start: '',
    rental_end: '',
    profile_image:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&h=256',
    interest_city_postcode: '74332',
    interest_city: 'Gutberg',
    interest_area: 'Nord',
    interest_room_count_min: 2,
    interest_room_count_max: 3,
    interest_size_min: 60,
    interest_size_max: 80,
    interest_level: 1,
    interest_bathtub: false,
    interest_shower: true,
    interest_bathroom_window: true,
    interest_kitchen: false,
    interest_balcony: true,
    interest_terrace: false,
    interest_basement: true,
    interest_price_min: 550,
    interest_price_max: 800,
  },
  {
    id: 2,
    firstname: 'Lana',
    lastname: 'Gregory',
    email: 'l.gergory@mail.net',
    phone: '0174 763221',
    street: 'Elbenweg',
    street_number: '2a',
    city: 'Gutberg',
    postcode: '74332',
    rental_start: '01.01.2019',
    rental_end: '31.12.2024',
    profile_image:
      'https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&w=256&h=256',
    interest_city_postcode: '74332',
    interest_city: 'Gutberg',
    interest_area: 'Nord',
    interest_room_count_min: 2,
    interest_room_count_max: 3,
    interest_size_min: 60,
    interest_size_max: 80,
    interest_level: 1,
    interest_bathtub: false,
    interest_shower: true,
    interest_bathroom_window: true,
    interest_kitchen: false,
    interest_balcony: true,
    interest_terrace: false,
    interest_basement: true,
    interest_price_min: 550,
    interest_price_max: 700,
  },
  {
    id: 3,
    firstname: 'Georg',
    lastname: 'Müller',
    email: 'georg.my@provider.com',
    phone: '0154 760980',
    street: 'Kaufstraße',
    street_number: '45',
    city: 'Schönstadt',
    postcode: '74223',
    rental_start: '01.01.2021',
    rental_end: '31.12.2022',
    profile_image:
      'https://images.unsplash.com/photo-1572965733194-784e4b4efa45?auto=format&fit=crop&w=256&h=256',
    interest_city_postcode: '74332',
    interest_city: 'Gutberg',
    interest_area: 'Süd',
    interest_room_count_min: 3,
    interest_room_count_max: 4,
    interest_size_min: 90,
    interest_size_max: 110,
    interest_level: 0,
    interest_bathtub: true,
    interest_shower: true,
    interest_bathroom_window: true,
    interest_kitchen: true,
    interest_balcony: false,
    interest_terrace: true,
    interest_basement: true,
    interest_price_min: 850,
    interest_price_max: 1200,
  },
  {
    id: 4,
    firstname: 'Celine',
    lastname: 'Hansen',
    email: 'celi.hansen@provider.com',
    phone: '01740 6734',
    street: 'Kaufstraße',
    street_number: '31',
    city: 'Schönstadt',
    postcode: '74223',
    rental_start: '01.01.2015',
    rental_end: '31.12.2022',
    profile_image:
      'https://images.unsplash.com/photo-1546422401-ae86d9d58b0d?auto=format&fit=crop&w=256&h=256',
    interest_city_postcode: '74223',
    interest_city: 'Schönstadt',
    interest_area: 'Süd',
    interest_room_count_min: 2,
    interest_room_count_max: 2,
    interest_size_min: 40,
    interest_size_max: 55,
    interest_level: 2,
    interest_bathtub: true,
    interest_shower: true,
    interest_bathroom_window: true,
    interest_kitchen: true,
    interest_balcony: false,
    interest_terrace: false,
    interest_basement: true,
    interest_price_min: 350,
    interest_price_max: 450,
  },
  {
    id: 5,
    firstname: 'Joena',
    lastname: 'Devno',
    email: 'joe.dev@mail.io',
    phone: '0142 781245',
    street: 'Mittelkreis',
    street_number: '9',
    city: 'Gindilingen',
    postcode: '67443',
    rental_start: '',
    rental_end: '',
    profile_image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&h=256',
    interest_city_postcode: '74332',
    interest_city: 'Gutberg',
    interest_area: 'Nord',
    interest_room_count_min: 2,
    interest_room_count_max: 4,
    interest_size_min: 40,
    interest_size_max: 80,
    interest_level: 1,
    interest_bathtub: false,
    interest_shower: true,
    interest_bathroom_window: true,
    interest_kitchen: true,
    interest_balcony: true,
    interest_terrace: false,
    interest_basement: true,
    interest_price_min: 350,
    interest_price_max: 950,
  },
  {
    id: 6,
    firstname: 'Tom',
    lastname: 'Siva',
    email: 'Tom.tomtom@gmx.it',
    phone: '0157 8902345',
    street: 'Kaufstraße',
    street_number: '10',
    city: 'Schönstadt',
    postcode: '74223',
    rental_start: '01.07.2020',
    rental_end: '31.06.2022',
    profile_image:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=256&h=256',
    interest_city_postcode: '74332',
    interest_city: 'Gutberg',
    interest_area: 'Nord',
    interest_room_count_min: 2,
    interest_room_count_max: 4,
    interest_size_min: 40,
    interest_size_max: 80,
    interest_level: 1,
    interest_bathtub: false,
    interest_shower: true,
    interest_bathroom_window: true,
    interest_kitchen: true,
    interest_balcony: true,
    interest_terrace: false,
    interest_basement: true,
    interest_price_min: 400,
    interest_price_max: 900,
  },
  {
    id: 7,
    firstname: 'Diano',
    lastname: 'Schmitt',
    email: 'd.schmidt@mail.io',
    phone: '0132 249063',
    street: 'Mozartweg',
    street_number: '4b',
    city: 'Schönstadt',
    postcode: '74223',
    rental_start: '01.01.2018',
    rental_end: '31.06.2020',
    profile_image:
      'https://images.unsplash.com/photo-1614289371518-722f2615943d?auto=format&fit=crop&w=256&h=256',
    interest_city_postcode: '74223',
    interest_city: 'Schönstadt',
    interest_area: 'Nord',
    interest_room_count_min: 4,
    interest_room_count_max: 5,
    interest_size_min: 90,
    interest_size_max: 120,
    interest_level: 0,
    interest_bathtub: true,
    interest_shower: true,
    interest_bathroom_window: true,
    interest_kitchen: false,
    interest_balcony: false,
    interest_terrace: true,
    interest_basement: true,
    interest_price_min: 900,
    interest_price_max: 1300,
  },
  {
    id: 8,
    firstname: 'Viana',
    lastname: 'Kulitz',
    email: 'vivi.kulitz@mail.net',
    phone: '0174 543198',
    street: 'Bahnstraße',
    street_number: '2',
    city: 'Gutberg',
    postcode: '74332',
    rental_start: '01.01.2021',
    rental_end: '31.12.2025',
    profile_image:
      'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?auto=format&fit=crop&w=256&h=256',
    interest_city_postcode: '74223',
    interest_city: 'Schönstadt',
    interest_area: 'Nord',
    interest_room_count_min: 2,
    interest_room_count_max: 4,
    interest_size_min: 60,
    interest_size_max: 90,
    interest_level: 0,
    interest_bathtub: false,
    interest_shower: true,
    interest_bathroom_window: true,
    interest_kitchen: false,
    interest_balcony: false,
    interest_terrace: true,
    interest_basement: true,
    interest_price_min: 550,
    interest_price_max: 900,
  },
  {
    id: 9,
    firstname: 'Dennis',
    lastname: 'Absu',
    email: 'dennis.absu@provider.net',
    phone: '0176 109467',
    street: 'Laubstraße',
    street_number: '39',
    city: 'Gindilingen',
    postcode: '67443',
    rental_start: '01.01.2012',
    rental_end: '31.12.2022',
    profile_image:
      'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=256&h=256',
    interest_city_postcode: '74223',
    interest_city: 'Schönstadt',
    interest_area: 'Nord',
    interest_room_count_min: 2,
    interest_room_count_max: 4,
    interest_size_min: 40,
    interest_size_max: 80,
    interest_level: 1,
    interest_bathtub: false,
    interest_shower: true,
    interest_bathroom_window: true,
    interest_kitchen: true,
    interest_balcony: true,
    interest_terrace: false,
    interest_basement: true,
    interest_price_min: 350,
    interest_price_max: 950,
  },
  {
    id: 10,
    firstname: 'Luisa',
    lastname: 'Grone',
    email: 'grone.luisa@mail.io',
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
  },
]
