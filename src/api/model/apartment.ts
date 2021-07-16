import { AXIOS } from '../backend'
import BackendResult from './result'
import { getPersonById } from './person'
import { copyObjectByValues } from '../util/utils'

export default interface Apartment {
  id: number
  street: string
  street_number: string
  city: string
  postcode: string
  area: string
  room_count: number
  size: number
  level: number
  bathtub: boolean
  shower: boolean
  bathroom_window: boolean
  kitchen: boolean
  balcony: boolean
  terrace: boolean
  basement: boolean
  price: number
  description: string
  tenant: number | null
  cover_image: string
  profile_image: string
  potential_tenants: Array<number>
}

/**
 * Returns all apartments that fit the needs of a given potential tenant
 * @param potentialTenantId Id of the potential tenant to look for
 */
export const filterForPotentialTenant = (
  potentialTenantId: number
): BackendResult<Apartment[]> => {
  const result: BackendResult<Apartment[]> = new BackendResult()
  const potentialTenant = getPersonById(potentialTenantId, true)
  if (!potentialTenant.isError()) {
    const apartments = getAllApartments(true)
    if (!apartments.isError()) {
      result.data = apartments.data.filter((a) => {
        return (
          a.postcode === potentialTenant.data.interest_city_postcode &&
          a.city === potentialTenant.data.interest_city &&
          a.area === potentialTenant.data.interest_area &&
          a.room_count >= potentialTenant.data.interest_room_count_min &&
          a.room_count <= potentialTenant.data.interest_room_count_max &&
          a.size >= potentialTenant.data.interest_size_min &&
          a.size <= potentialTenant.data.interest_size_max &&
          a.level === potentialTenant.data.interest_level &&
          a.bathtub === potentialTenant.data.interest_bathtub &&
          a.shower === potentialTenant.data.interest_shower &&
          a.bathroom_window === potentialTenant.data.interest_bathroom_window &&
          a.kitchen === potentialTenant.data.interest_kitchen &&
          a.balcony === potentialTenant.data.interest_balcony &&
          a.terrace === potentialTenant.data.interest_terrace &&
          a.basement === potentialTenant.data.interest_basement &&
          a.price >= potentialTenant.data.interest_price_min &&
          a.price <= potentialTenant.data.interest_price_max
        )
      })
    } else {
      result.error = apartments.error
    }
  } else {
    result.error = potentialTenant.error
  }
  return result
}

/**
 * Removes the Tenant of the Apartment with the given id
 * @param apartmentId Id of the Apartment of which the tenant should get removed
 * @param useTestData Flag if temp test data should be used
 */
export const removeTenantFromApartment = (
  apartmentId: number,
  useTestData: boolean
): BackendResult<Apartment> => {
  const result: BackendResult<Apartment> = new BackendResult()
  const apartmentFetch = getApartmentById(apartmentId, useTestData)
  if (!apartmentFetch.isError()) {
    const apartment = apartmentFetch.data
    apartment.tenant = null
    const updatedApartmentFetch = updateApartment(apartment, useTestData)
    if (!updatedApartmentFetch.isError()) {
      result.data = updatedApartmentFetch.data
    } else {
      result.error = updatedApartmentFetch.error
    }
  } else {
    result.error = apartmentFetch.error
  }
  return result
}

/**
 * Add Tenant to the Apartment with the given id
 * @param apartmentId Id of Apartment to which the tenant should be added
 * @param tenantId Id of Person that should be added
 * @param useTestData Flag if temp test data should be used
 */
export const addTenantToApartment = (
  apartmentId: number,
  tenantId: number,
  useTestData: boolean
): BackendResult<Apartment> => {
  const result: BackendResult<Apartment> = new BackendResult()
  const apartmentFetch = getApartmentById(apartmentId, useTestData)
  if (!apartmentFetch.isError()) {
    const tenantFetch = getPersonById(tenantId, useTestData)
    if (!tenantFetch.isError()) {
      const apartment = apartmentFetch.data
      apartment.tenant = tenantId
      const updatedApartmentFetch = updateApartment(apartment, useTestData)
      if (!updatedApartmentFetch.isError()) {
        result.data = updatedApartmentFetch.data
      } else {
        result.error = updatedApartmentFetch.error
      }
    } else {
      result.error = tenantFetch.error
    }
  } else {
    result.error = apartmentFetch.error
  }
  return result
}

/**
 * Removes the Potential Tenant of the Apartment with the given id
 * @param apartmentId Id of the Apartment of which the tenant should get removed
 * @param tenantId Id of Person that should get removed from Potential Tenants
 * @param useTestData Flag if temp test data should be used
 */
export const removePotentialTenantFromApartment = (
  apartmentId: number,
  tenantId: number,
  useTestData: boolean
): BackendResult<Apartment> => {
  const result: BackendResult<Apartment> = new BackendResult()
  const apartmentFetch = getApartmentById(apartmentId, useTestData)
  if (!apartmentFetch.isError()) {
    const tenantFetch = getPersonById(tenantId, useTestData)
    if (!tenantFetch.isError()) {
      const apartment = apartmentFetch.data
      if (apartment.potential_tenants.includes(tenantId)) {
        apartment.potential_tenants = apartment.potential_tenants.filter(
          (i) => i !== tenantId
        )
        const updatedApartmentFetch = updateApartment(apartment, useTestData)
        if (!updatedApartmentFetch.isError()) {
          result.data = updatedApartmentFetch.data
        } else {
          result.error = updatedApartmentFetch.error
        }
      } else {
        result.error = 'Potential Tenant not in Apartment'
      }
    } else {
      result.error = tenantFetch.error
    }
  } else {
    result.error = apartmentFetch.error
  }
  return result
}

/**
 * Add Potential Tenant to the Apartment with the given id
 * @param apartmentId Id of Apartment to which the tenant should be added
 * @param tenantId Id of Person that should be added
 * @param useTestData Flag if temp test data should be used
 */
export const addPotentialTenantToApartment = (
  apartmentId: number,
  tenantId: number,
  useTestData: boolean
): BackendResult<Apartment> => {
  const result: BackendResult<Apartment> = new BackendResult()
  const apartmentFetch = getApartmentById(apartmentId, useTestData)
  if (!apartmentFetch.isError()) {
    const tenantFetch = getPersonById(tenantId, useTestData)
    if (!tenantFetch.isError()) {
      const apartment = apartmentFetch.data
      if (!apartment.potential_tenants.includes(tenantId)) {
        apartment.potential_tenants.push(tenantId)
        const updatedApartmentFetch = updateApartment(apartment, useTestData)
        if (!updatedApartmentFetch.isError()) {
          result.data = updatedApartmentFetch.data
        } else {
          result.error = updatedApartmentFetch.error
        }
      } else {
        result.error = 'Potential Tenant already in Apartment'
      }
    } else {
      result.error = tenantFetch.error
    }
  } else {
    result.error = apartmentFetch.error
  }
  return result
}

/**
 * Returns all Apartments
 * @param useTestData Flag if temp test data should be used
 */
export const getAllApartments = (
  useTestData: boolean
): BackendResult<Apartment[]> => {
  const result: BackendResult<Apartment[]> = new BackendResult()
  if (useTestData) {
    result.data = copyObjectByValues(apartmentTestData) as Apartment[]
  } else {
    AXIOS.get('/apartments')
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
 * Searches for an Apartment by its Id and returns it if found
 * @param id Id of Apartment to search for
 * @param useTestData Flag if temp test data should be used
 */
export const getApartmentById = (
  id: number,
  useTestData: boolean
): BackendResult<Apartment> => {
  const result: BackendResult<Apartment> = new BackendResult()
  if (useTestData) {
    const apartment = apartmentTestData.find((a) => a.id === id)
    if (apartment != undefined) {
      result.data = copyObjectByValues(apartment) as Apartment
    } else {
      result.error = 'Apartment not found'
    }
  } else {
    AXIOS.get('/apartments?id=' + id)
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
 * Creates a new Apartment
 * @param apartment Apartment to create
 * @param useTestData Flag if temp test data should be used
 */
export const createApartment = (
  apartment: Apartment,
  useTestData: boolean
): BackendResult<Apartment> => {
  const result: BackendResult<Apartment> = new BackendResult()
  if (useTestData) {
    apartment.id = apartmentTestData.length + 1
    apartmentTestData.push(apartment)
    result.data = copyObjectByValues(apartment) as Apartment
  } else {
    AXIOS.post('/apartments', apartment)
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
 * Updates an Apartment
 * @param apartment Apartment to update
 * @param useTestData Flag if temp test data should be used
 */
export const updateApartment = (
  apartment: Apartment,
  useTestData: boolean
): BackendResult<Apartment> => {
  const result: BackendResult<Apartment> = new BackendResult()
  if (useTestData) {
    const apartmentToUpdate = apartmentTestData.find(
      (a) => a.id === apartment.id
    )
    if (apartmentToUpdate != undefined) {
      Object.assign(apartmentToUpdate, apartment)
      result.data = copyObjectByValues(apartment) as Apartment
    } else {
      result.error = 'Apartment not found'
    }
  } else {
    AXIOS.put('/apartments?id=' + apartment.id, apartment)
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
 * Deletes an Apartment by a given Id
 * @param id Id of Apartment to delete
 * @param useTestData Flag if temp test data should be used
 */
export const deleteApartment = (
  id: number,
  useTestData: boolean
): BackendResult<boolean> => {
  const result: BackendResult<boolean> = new BackendResult()
  result.data = false
  if (useTestData) {
    const apartmentToUpdate = apartmentTestData.find((a) => a.id === id)
    if (apartmentToUpdate !== undefined) {
      apartmentTestData = apartmentTestData.filter((a) => a.id !== id)
      result.data = true
    } else {
      result.error = 'Apartment not found'
    }
  } else {
    AXIOS.delete('/apartments?id=' + id)
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

/**
 * Temp test data
 */
export let apartmentTestData: Apartment[] = [
  {
    id: 1,
    street: 'Ahornweg',
    street_number: '12',
    city: 'Gutberg',
    postcode: '74332',
    area: 'Nord',
    room_count: 3,
    size: 75,
    level: 1,
    bathtub: false,
    shower: true,
    bathroom_window: true,
    kitchen: false,
    balcony: true,
    terrace: false,
    basement: true,
    price: 680,
    description:
      'Schöne, lichtdurchflutete Wohnung. Ideal für Studenten. Sehr zentrumsnah.',
    tenant: null,
    cover_image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1920&h=480',
    profile_image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=256&h=256',
    potential_tenants: [1],
  },
  {
    id: 2,
    street: 'Bahnstraße',
    street_number: '2',
    city: 'Gutberg',
    postcode: '74332',
    area: 'Nord',
    room_count: 3,
    size: 70,
    level: 1,
    bathtub: false,
    shower: true,
    bathroom_window: true,
    kitchen: true,
    balcony: true,
    terrace: false,
    basement: true,
    price: 590,
    description:
      'Neu renoviert. Direkt bezugsfertig. Neue Installation von Smart Home.',
    tenant: 8,
    cover_image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1920&h=480',
    profile_image:
      'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=256&h=256',
    potential_tenants: [5, 6],
  },
  {
    id: 3,
    street: 'Bahnstraße',
    street_number: '7',
    city: 'Gutberg',
    postcode: '74332',
    area: 'Nord',
    room_count: 4,
    size: 80,
    level: 1,
    bathtub: false,
    shower: true,
    bathroom_window: true,
    kitchen: false,
    balcony: true,
    terrace: false,
    basement: true,
    price: 820,
    description: 'Altbau. Modern saniert. Ideal für designaffine Personen.',
    tenant: null,
    cover_image:
      'https://images.unsplash.com/photo-1499955085172-a104c9463ece?auto=format&fit=crop&w=1920&h=480',
    profile_image:
      'https://images.unsplash.com/photo-1484606075493-62da7cd65654?auto=format&fit=crop&w=256&h=256',
    potential_tenants: [],
  },
  {
    id: 4,
    street: 'Mozartweg',
    street_number: '4b',
    city: 'Schönstadt',
    postcode: '74223',
    area: 'Süd',
    room_count: 2,
    size: 52,
    level: 2,
    bathtub: true,
    shower: true,
    bathroom_window: true,
    kitchen: true,
    balcony: false,
    terrace: false,
    basement: true,
    price: 430,
    description:
      'Sehr günstige Wohnung. Am Rande von Schönstadt. Park in direkter Nähe. Weg zur Universität beträgt nur 10 Minuten zu Fuß.',
    tenant: 7,
    cover_image:
      'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1920&h=480',
    profile_image:
      'https://images.unsplash.com/photo-1595330449916-e7c3e1962bd3?auto=format&fit=crop&w=256&h=256',
    potential_tenants: [],
  },
  {
    id: 5,
    street: 'Kaufstraße',
    street_number: '45',
    city: 'Schönstadt',
    postcode: '74223',
    area: 'Nord',
    room_count: 2,
    size: 70,
    level: 1,
    bathtub: false,
    shower: true,
    bathroom_window: true,
    kitchen: false,
    balcony: true,
    terrace: false,
    basement: true,
    price: 600,
    description:
      'Altbau. Frisch renoviert worden im Jahre 2020. Klein aber fein.',
    tenant: 3,
    cover_image:
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1920&h=480',
    profile_image:
      'https://images.unsplash.com/photo-1613930136425-ebb34f8654cb?auto=format&fit=crop&w=256&h=256',
    potential_tenants: [],
  },
  {
    id: 6,
    street: 'Kaufstraße',
    street_number: '22b',
    city: 'Schönstadt',
    postcode: '74223',
    area: 'Nord',
    room_count: 3,
    size: 85,
    level: 0,
    bathtub: true,
    shower: true,
    bathroom_window: true,
    kitchen: true,
    balcony: false,
    terrace: true,
    basement: true,
    price: 950,
    description:
      'Altbau. Frisch renoviert worden im Jahre 2020. Klein aber fein.',
    tenant: null,
    cover_image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&h=480',
    profile_image:
      'https://images.unsplash.com/photo-1585641428364-97b2284664d2?auto=format&fit=crop&w=256&h=256',
    potential_tenants: [],
  },
  {
    id: 7,
    street: 'Rundring',
    street_number: '2',
    city: 'Schönstadt',
    postcode: '74223',
    area: 'Nord',
    room_count: 4,
    size: 90,
    level: 0,
    bathtub: true,
    shower: true,
    bathroom_window: true,
    kitchen: false,
    balcony: false,
    terrace: true,
    basement: true,
    price: 900,
    description:
      'Altbau. Frisch renoviert worden im Jahre 2020. Klein aber fein.',
    tenant: null,
    cover_image:
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1920&h=480',
    profile_image:
      'https://images.unsplash.com/photo-1597430051730-f8df397f07f5?auto=format&fit=crop&w=256&h=256',
    potential_tenants: [],
  },
  {
    id: 8,
    street: 'Rundring',
    street_number: '2',
    city: 'Schönstadt',
    postcode: '74223',
    area: 'Nord',
    room_count: 4,
    size: 110,
    level: 0,
    bathtub: true,
    shower: true,
    bathroom_window: true,
    kitchen: false,
    balcony: false,
    terrace: true,
    basement: true,
    price: 1250,
    description:
      'Altbau. Frisch renoviert worden im Jahre 2020. Klein aber fein.',
    tenant: null,
    cover_image:
      'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1920&h=480',
    profile_image:
      'https://images.unsplash.com/photo-1597430051730-f8df397f07f5?auto=format&fit=crop&w=256&h=256',
    potential_tenants: [],
  },
  {
    id: 9,
    street: 'Rundring',
    street_number: '2',
    city: 'Schönstadt',
    postcode: '74223',
    area: 'Nord',
    room_count: 3,
    size: 80,
    level: 0,
    bathtub: false,
    shower: true,
    bathroom_window: true,
    kitchen: false,
    balcony: false,
    terrace: true,
    basement: true,
    price: 890,
    description:
      'Altbau. Frisch renoviert worden im Jahre 2020. Klein aber fein.',
    tenant: null,
    cover_image:
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1920&h=480',
    profile_image:
      'https://images.unsplash.com/photo-1597430051730-f8df397f07f5?auto=format&fit=crop&w=256&h=256',
    potential_tenants: [8],
  },
]
