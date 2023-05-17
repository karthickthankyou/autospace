import { gql } from 'graphql-request'

export const createManager = gql`
  mutation CreateManager($createManagerInput: CreateManagerInput!) {
    createManager(createManagerInput: $createManagerInput) {
      uid
    }
  }
`

export const createCustomer = gql`
  mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      uid
    }
  }
`

export const logout = gql`
  mutation logout {
    logout
  }
`

export const garages = gql`
  query Garages(
    $orderBy: [GarageOrderByWithRelationInput!]
    $where: GarageWhereInput
    $cursor: GarageWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [GarageScalarFieldEnum!]
  ) {
    garages(
      orderBy: $orderBy
      where: $where
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      id
      displayName
      description
      images
      address {
        address
      }
    }
    garagesCount(where: $where) {
      count
    }
  }
`

export const searchGarages = gql`
  query SearchGarages(
    $dateFilter: DateFilterInput!
    $locationFilter: LocationFilterInput!
    $garageFilter: GarageFilter
    $slotsFilter: SlotWhereInput
  ) {
    searchGarages(
      dateFilter: $dateFilter
      locationFilter: $locationFilter
      garageFilter: $garageFilter
      slotsFilter: $slotsFilter
    ) {
      id
      address {
        lat
        lng
        address
      }
      images
      displayName
      availableSlots(slotsFilter: $slotsFilter, dateFilter: $dateFilter) {
        type
        count
        pricePerHour
      }
    }
  }
`

export const createBooking = gql`
  mutation createBooking($createBookingInput: CreateBookingInput!) {
    createBooking(createBookingInput: $createBookingInput) {
      id
      passcode
    }
  }
`
export const bookings = gql`
  query bookings(
    $distinct: [BookingScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: BookingWhereUniqueInput
    $orderBy: [BookingOrderByWithRelationInput!]
    $where: BookingWhereInput
  ) {
    bookings(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
    ) {
      id
      pricePerHour
      endTime
      startTime
      vehicleNumber
      passcode
      slot {
        displayName
        garage {
          images
          address {
            address
            lat
            lng
          }
        }
      }
    }

    bookingsCount(where: $where) {
      count
    }
  }
`

export const login = gql`
  mutation Login($credentials: LoginInput!) {
    login(credentials: $credentials) {
      refreshToken
      localId
      kind
      idToken
      expiresIn
      email
      displayName
    }
  }
`

export const register = gql`
  mutation register($credentials: RegisterInput!) {
    register(credentials: $credentials) {
      refreshToken
      localId
      kind
      idToken
      expiresIn
      email
      displayName
    }
  }
`

export const getManager = gql`
  query getManager($where: ManagerWhereUniqueInput!) {
    manager(where: $where) {
      uid
      createdAt
      updatedAt
      displayName
    }
  }
`

export const createCompany = gql`
  mutation createCompany($createCompanyInput: CreateCompanyInput!) {
    createCompany(createCompanyInput: $createCompanyInput) {
      id
    }
  }
`

export const createManySlots = gql`
  mutation createManySlots($slots: [CreateSlotInput!]!) {
    createManySlots(slots: $slots) {
      count
    }
  }
`

export const company = gql`
  query myCompany {
    myCompany {
      id
      createdAt
      displayName
    }
  }
`

export const createGarage = gql`
  mutation createGarage($createGarageInput: CreateGarageInput!) {
    createGarage(createGarageInput: $createGarageInput) {
      id
    }
  }
`

export const admins = gql`
  query admins(
    $distinct: [AdminScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: AdminWhereUniqueInput
    $orderBy: [AdminOrderByWithRelationInput!]
    $where: AdminWhereInput
  ) {
    admins(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
    ) {
      uid
      updatedAt
      displayName
      createdAt
    }
    adminsCount(where: $where) {
      count
    }
  }
`
