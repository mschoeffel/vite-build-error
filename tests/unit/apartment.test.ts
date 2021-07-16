import Apartment, {
  addPotentialTenantToApartment,
  addTenantToApartment,
  apartmentTestData,
  createApartment,
  deleteApartment,
  getAllApartments,
  getApartmentById,
  removePotentialTenantFromApartment,
  removeTenantFromApartment,
  updateApartment,
} from '../../src/api/model/apartment'
import { personTestData } from '../../src/api/model/person'

test('get all apartments', () => {
  const result = getAllApartments(true)
  expect(result.isError()).toBeFalsy()
  expect(result.data).toEqual(apartmentTestData)
  expect(result.error).toBeNull()
})

test('get valid apartment by id', () => {
  const id = 1
  const apartment = apartmentTestData.find((a) => a.id === id)
  expect(apartment).not.toBeUndefined()
  if (apartment !== undefined) {
    const result = getApartmentById(id, true)
    expect(result.isError()).toBeFalsy()
    expect(result.data).toEqual(apartment)
    expect(result.error).toBeNull()
  }
})

test('get error apartment by invalid id', () => {
  const invalidId = 100
  const result = getApartmentById(invalidId, true)
  expect(result.isError()).toBeTruthy()
  expect(result.data).toEqual({})
  expect(result.error).toBe('Apartment not found')
})

test('create apartment', () => {
  const apartment: Apartment = {
    id: 0,
    street: 'Testweg',
    street_number: '12',
    city: 'Testort',
    postcode: '12345',
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
    description: 'Eine tolle Testbeschreibung.',
    tenant: 5,
    cover_image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1920&h=480',
    profile_image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=256&h=256',
    potential_tenants: [1, 3],
  }
  const result = createApartment(apartment, true)
  expect(result.isError()).toBeFalsy()
  expect(result.data).toEqual(apartment)
  expect(result.data.id).toBeGreaterThanOrEqual(1)
  expect(result.error).toBeNull()
  expect(apartmentTestData.find((a) => a.id === result.data.id)).toEqual(
    result.data
  )
})

test('update valid apartment', () => {
  const id = 1
  const apartment = apartmentTestData.find((a) => a.id === id)
  expect(apartment).not.toBeUndefined()
  if (apartment != undefined) {
    const apartmentUpdate = {
      id: id,
      street: 'Testweg',
      street_number: '12',
      city: 'Testort',
      postcode: '12345',
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
      description: 'Eine tolle Testbeschreibung.',
      tenant: 5,
      cover_image:
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1920&h=480',
      profile_image:
        'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=256&h=256',
      potential_tenants: [1, 3],
    }

    const result = updateApartment(apartmentUpdate, true)
    expect(result.isError()).toBeFalsy()
    expect(result.error).toBeNull()
    expect(result.data).toEqual(apartmentUpdate)
    expect(result.data.id).toEqual(apartmentUpdate.id)
    expect(result.data.id).toEqual(id)
    expect(apartmentTestData.find((a) => a.id === id)).toEqual(apartmentUpdate)
  }
})

test('update invalid apartment', () => {
  const invalidId = 100
  const apartment = {
    id: invalidId,
    street: 'Testweg',
    street_number: '12',
    city: 'Testort',
    postcode: '12345',
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
    description: 'Eine tolle Testbeschreibung.',
    tenant: 5,
    cover_image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1920&h=480',
    profile_image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=256&h=256',
    potential_tenants: [1, 3],
  }
  const result = updateApartment(apartment, true)
  expect(result.isError()).toBeTruthy()
  expect(result.data).toEqual({})
  expect(result.error).toBe('Apartment not found')
})

test('delete apartment by id', () => {
  const id = 1
  const result = deleteApartment(id, true)
  expect(result.isError()).toBeFalsy()
  expect(result.data).toBeTruthy()
  expect(result.error).toBeNull()
  const apartmentDeleted = apartmentTestData.find((a) => a.id === id)
  expect(apartmentDeleted).toBeUndefined()
})

test('get error deleting apartment by invalid id', () => {
  const invalidId = 100
  const result = deleteApartment(invalidId, true)
  expect(result.isError()).toBeTruthy()
  expect(result.data).toBeFalsy()
  expect(result.error).toBe('Apartment not found')
})

test('remove tenant of apartment valid', () => {
  const id = 2
  const testDataApartmentBefore = apartmentTestData.find((a) => a.id === id)
  expect(testDataApartmentBefore).not.toBeUndefined()
  if (testDataApartmentBefore !== undefined) {
    expect(testDataApartmentBefore.tenant).not.toBeUndefined()
  }
  const apartmentFetch = getApartmentById(id, true)
  expect(apartmentFetch.isError()).toBeFalsy()
  expect(apartmentFetch.error).toBeNull()
  expect(apartmentFetch.data.tenant).not.toBeNull()
  const result = removeTenantFromApartment(id, true)
  expect(result.isError()).toBeFalsy()
  expect(result.error).toBeNull()
  expect(result.data.tenant).toBeNull()
  const testDataApartmentAfter = apartmentTestData.find((a) => a.id === id)
  expect(testDataApartmentAfter).not.toBeUndefined()
  if (testDataApartmentAfter !== undefined) {
    expect(testDataApartmentAfter.tenant).toBeNull()
  }
})

test('remove tenant of apartment with no tenant valid', () => {
  const id = 2
  const testDataApartmentBefore = apartmentTestData.find((a) => a.id === id)
  expect(testDataApartmentBefore).not.toBeUndefined()
  if (testDataApartmentBefore !== undefined) {
    expect(testDataApartmentBefore.tenant).toBeNull()
  }
  const apartmentFetch = getApartmentById(id, true)
  expect(apartmentFetch.isError()).toBeFalsy()
  expect(apartmentFetch.error).toBeNull()
  expect(apartmentFetch.data.tenant).toBeNull()
  const result = removeTenantFromApartment(id, true)
  expect(result.isError()).toBeFalsy()
  expect(result.error).toBeNull()
  expect(result.data.tenant).toBeNull()
  const testDataApartmentAfter = apartmentTestData.find((a) => a.id === id)
  expect(testDataApartmentAfter).not.toBeUndefined()
  if (testDataApartmentAfter !== undefined) {
    expect(testDataApartmentAfter.tenant).toBeNull()
  }
})

test('remove tenant of apartment invalid', () => {
  const invalidId = 200
  const testDataApartmentBefore = apartmentTestData.find(
    (a) => a.id === invalidId
  )
  expect(testDataApartmentBefore).toBeUndefined()

  const result = removeTenantFromApartment(invalidId, true)
  expect(result.isError()).toBeTruthy()
  expect(result.error).toEqual('Apartment not found')
  expect(result.data).toEqual({})
})

test('add tenant to apartment invalid apartment', () => {
  const invalidApartmentId = 200
  const tenantId = 1
  const testDataApartment = apartmentTestData.find(
    (a) => a.id === invalidApartmentId
  )
  expect(testDataApartment).toBeUndefined()

  const testDataTenant = personTestData.find((p) => p.id === tenantId)
  expect(testDataTenant).not.toBeUndefined()

  const result = addTenantToApartment(invalidApartmentId, tenantId, true)
  expect(result.isError()).toBeTruthy()
  expect(result.error).toEqual('Apartment not found')
  expect(result.data).toEqual({})
})

test('add tenant to apartment invalid tenant', () => {
  const apartmentId = 2
  const invalidTenantId = 100
  const testDataApartment = apartmentTestData.find((a) => a.id === apartmentId)
  expect(testDataApartment).not.toBeUndefined()

  const testDataTenant = personTestData.find((p) => p.id === invalidTenantId)
  expect(testDataTenant).toBeUndefined()

  const result = addTenantToApartment(apartmentId, invalidTenantId, true)
  expect(result.isError()).toBeTruthy()
  expect(result.error).toEqual('Person not found')
  expect(result.data).toEqual({})
})

test('add tenant to apartment with no tenant valid', () => {
  const apartmentId = 2
  const tenantId = 1
  const testDataApartment = apartmentTestData.find((a) => a.id === apartmentId)
  expect(testDataApartment).not.toBeUndefined()
  if (testDataApartment !== undefined) {
    expect(testDataApartment.tenant).toBeNull()

    const testDataTenant = personTestData.find((p) => p.id === tenantId)
    expect(testDataTenant).not.toBeUndefined()

    const result = addTenantToApartment(apartmentId, tenantId, true)
    expect(result.isError()).toBeFalsy()
    expect(result.error).toBeNull()
    expect(result.data.tenant).toEqual(tenantId)
    expect(testDataApartment.tenant).toEqual(tenantId)
  }
})

test('add tenant to apartment with tenant valid', () => {
  const apartmentId = 2
  const tenantId = 7
  const testDataApartment = apartmentTestData.find((a) => a.id === apartmentId)
  expect(testDataApartment).not.toBeUndefined()
  if (testDataApartment !== undefined) {
    expect(testDataApartment.tenant).not.toBeNull()

    const testDataTenant = personTestData.find((p) => p.id === tenantId)
    expect(testDataTenant).not.toBeUndefined()

    const result = addTenantToApartment(apartmentId, tenantId, true)
    expect(result.isError()).toBeFalsy()
    expect(result.error).toBeNull()
    expect(result.data.tenant).toEqual(tenantId)
    expect(testDataApartment.tenant).toEqual(tenantId)
  }
})

test('add potential tenant to apartment with tenant invalid', () => {
  const apartmentId = 3
  const invalidTenantId = 150
  const testDataApartment = apartmentTestData.find((a) => a.id === apartmentId)
  expect(testDataApartment).not.toBeUndefined()
  if (testDataApartment !== undefined) {
    expect(testDataApartment.potential_tenants.length).toBe(0)

    const testDataTenant = personTestData.find((p) => p.id === invalidTenantId)
    expect(testDataTenant).toBeUndefined()

    const result = addPotentialTenantToApartment(
      apartmentId,
      invalidTenantId,
      true
    )
    expect(result.isError()).toBeTruthy()
    expect(result.error).toEqual('Person not found')
    expect(result.data).toEqual({})
    expect(testDataApartment.potential_tenants.length).toEqual(0)
  }
})

test('add potential tenant to apartment with apartment invalid', () => {
  const invalidApartmentId = 250
  const tenantId = 1

  const testDataTenant = personTestData.find((p) => p.id === tenantId)
  expect(testDataTenant).not.toBeUndefined()
  if (testDataTenant !== undefined) {
    const testDataApartment = apartmentTestData.find(
      (a) => a.id === invalidApartmentId
    )
    expect(testDataApartment).toBeUndefined()

    const result = addPotentialTenantToApartment(
      invalidApartmentId,
      tenantId,
      true
    )
    expect(result.isError()).toBeTruthy()
    expect(result.error).toEqual('Apartment not found')
    expect(result.data).toEqual({})
  }
})

test('add potential tenant to apartment with tenant already in apartment invalid', () => {
  const apartmentId = 2
  const tenantId = 5
  const testDataApartment = apartmentTestData.find((a) => a.id === apartmentId)
  expect(testDataApartment).not.toBeUndefined()
  if (testDataApartment !== undefined) {
    expect(testDataApartment.potential_tenants.length).toBe(2)

    const testDataTenant = personTestData.find((p) => p.id === tenantId)
    expect(testDataTenant).not.toBeUndefined()
    if (testDataTenant !== undefined) {
      expect(testDataApartment.potential_tenants).toContain(tenantId)

      const result = addPotentialTenantToApartment(apartmentId, tenantId, true)
      expect(result.isError()).toBeTruthy()
      expect(result.error).toEqual('Potential Tenant already in Apartment')
      expect(result.data).toEqual({})
      expect(testDataApartment.potential_tenants.length).toEqual(2)
    }
  }
})

test('add potential tenant to apartment valid', () => {
  const apartmentId = 2
  const tenantId = 7
  const testDataApartment = apartmentTestData.find((a) => a.id === apartmentId)
  expect(testDataApartment).not.toBeUndefined()
  if (testDataApartment !== undefined) {
    expect(testDataApartment.potential_tenants.length).toBe(2)

    const testDataTenant = personTestData.find((p) => p.id === tenantId)
    expect(testDataTenant).not.toBeUndefined()
    if (testDataTenant !== undefined) {
      expect(testDataApartment.potential_tenants).not.toContain(tenantId)

      const result = addPotentialTenantToApartment(apartmentId, tenantId, true)
      expect(result.isError()).toBeFalsy()
      expect(result.error).toBeNull()
      expect(result.data).toEqual(testDataApartment)
      expect(result.data.potential_tenants.length).toEqual(3)
      expect(result.data.potential_tenants).toContain(tenantId)
      expect(testDataApartment.potential_tenants.length).toEqual(3)
      expect(testDataApartment.potential_tenants).toContain(tenantId)
    }
  }
})

test('remove potential tenant of apartment with tenant invalid', () => {
  const apartmentId = 3
  const invalidTenantId = 150
  const testDataApartment = apartmentTestData.find((a) => a.id === apartmentId)
  expect(testDataApartment).not.toBeUndefined()
  if (testDataApartment !== undefined) {
    expect(testDataApartment.potential_tenants.length).toBe(0)

    const testDataTenant = personTestData.find((p) => p.id === invalidTenantId)
    expect(testDataTenant).toBeUndefined()

    const result = removePotentialTenantFromApartment(
      apartmentId,
      invalidTenantId,
      true
    )
    expect(result.isError()).toBeTruthy()
    expect(result.error).toEqual('Person not found')
    expect(result.data).toEqual({})
    expect(testDataApartment.potential_tenants.length).toEqual(0)
  }
})

test('remove potential tenant of apartment with apartment invalid', () => {
  const invalidApartmentId = 250
  const tenantId = 1

  const testDataTenant = personTestData.find((p) => p.id === tenantId)
  expect(testDataTenant).not.toBeUndefined()
  if (testDataTenant !== undefined) {
    const testDataApartment = apartmentTestData.find(
      (a) => a.id === invalidApartmentId
    )
    expect(testDataApartment).toBeUndefined()

    const result = removePotentialTenantFromApartment(
      invalidApartmentId,
      tenantId,
      true
    )
    expect(result.isError()).toBeTruthy()
    expect(result.error).toEqual('Apartment not found')
    expect(result.data).toEqual({})
  }
})

test('remove potential tenant of apartment with tenant not in apartment invalid', () => {
  const apartmentId = 2
  const tenantId = 2
  const testDataApartment = apartmentTestData.find((a) => a.id === apartmentId)
  expect(testDataApartment).not.toBeUndefined()
  if (testDataApartment !== undefined) {
    expect(testDataApartment.potential_tenants.length).toBe(3)

    const testDataTenant = personTestData.find((p) => p.id === tenantId)
    expect(testDataTenant).not.toBeUndefined()
    if (testDataTenant !== undefined) {
      expect(testDataApartment.potential_tenants).not.toContain(tenantId)

      const result = removePotentialTenantFromApartment(
        apartmentId,
        tenantId,
        true
      )
      expect(result.isError()).toBeTruthy()
      expect(result.error).toEqual('Potential Tenant not in Apartment')
      expect(result.data).toEqual({})
      expect(testDataApartment.potential_tenants.length).toEqual(3)
    }
  }
})

test('remove potential tenant of apartment valid', () => {
  const apartmentId = 2
  const tenantId = 5
  const testDataApartment = apartmentTestData.find((a) => a.id === apartmentId)
  expect(testDataApartment).not.toBeUndefined()
  if (testDataApartment !== undefined) {
    expect(testDataApartment.potential_tenants.length).toBe(3)

    const testDataTenant = personTestData.find((p) => p.id === tenantId)
    expect(testDataTenant).not.toBeUndefined()
    if (testDataTenant !== undefined) {
      expect(testDataApartment.potential_tenants).toContain(tenantId)

      const result = removePotentialTenantFromApartment(
        apartmentId,
        tenantId,
        true
      )
      expect(result.isError()).toBeFalsy()
      expect(result.error).toBeNull()
      expect(result.data).toEqual(testDataApartment)
      expect(result.data.potential_tenants.length).toEqual(2)
      expect(result.data.potential_tenants).not.toContain(tenantId)
      expect(testDataApartment.potential_tenants.length).toEqual(2)
      expect(testDataApartment.potential_tenants).not.toContain(tenantId)
    }
  }
})

test('return object of getting all apartments is not a reference', () => {
  const result = getAllApartments(true)
  expect(result.isError()).toBeFalsy()
  expect(result.data).toEqual(apartmentTestData)
  expect(result.data).not.toBe(apartmentTestData)
  expect(result.error).toBeNull()
})

test('return object of getting an apartment by id is not a reference', () => {
  const id = 2
  const result = getApartmentById(id, true)
  expect(result.isError()).toBeFalsy()
  expect(result.error).toBeNull()
  const testDataResult = apartmentTestData.find((a) => a.id === id)
  expect(testDataResult).not.toBeUndefined()
  if (testDataResult !== undefined) {
    expect(result.data).toEqual(testDataResult)
    expect(result.data).not.toBe(testDataResult)
  }
})

test('return object of creating an apartment is not a reference', () => {
  const apartment: Apartment = {
    id: 0,
    street: 'Testweg',
    street_number: '12',
    city: 'Testort',
    postcode: '12345',
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
    description: 'Eine tolle Testbeschreibung.',
    tenant: 5,
    cover_image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1920&h=480',
    profile_image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=256&h=256',
    potential_tenants: [1, 3],
  }
  const result = createApartment(apartment, true)
  expect(result.isError()).toBeFalsy()
  expect(result.data).toEqual(apartment)
  expect(result.data).not.toBe(apartment)
  expect(result.data.id).toBeGreaterThanOrEqual(1)
  expect(result.error).toBeNull()
  const testDataResult = apartmentTestData.find((a) => a.id === result.data.id)
  expect(testDataResult).not.toBeUndefined()
  if (testDataResult !== undefined) {
    expect(result.data).not.toBe(testDataResult)
    expect(result.data.id).toEqual(testDataResult.id)
  }
})

test('return object of updating an apartment is not a reference', () => {
  const id = 2
  const apartment = apartmentTestData.find((a) => a.id === id)
  expect(apartment).not.toBeUndefined()
  if (apartment != undefined) {
    const apartmentUpdate = {
      id: id,
      street: 'Testweg',
      street_number: '12',
      city: 'Testort',
      postcode: '12345',
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
      description: 'Eine tolle Testbeschreibung.',
      tenant: 5,
      cover_image:
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1920&h=480',
      profile_image:
        'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=256&h=256',
      potential_tenants: [1, 3],
    }

    const result = updateApartment(apartmentUpdate, true)
    expect(result.isError()).toBeFalsy()
    expect(result.error).toBeNull()
    expect(result.data).toEqual(apartmentUpdate)
    expect(result.data).not.toBe(apartmentUpdate)
    expect(result.data.id).toEqual(apartmentUpdate.id)
    expect(result.data.id).toEqual(id)
    const testDataResult = apartmentTestData.find((a) => a.id === id)
    expect(testDataResult).not.toBeUndefined()
    if (testDataResult !== undefined) {
      expect(result.data).toEqual(testDataResult)
      expect(result.data).not.toBe(testDataResult)
    }
  }
})
