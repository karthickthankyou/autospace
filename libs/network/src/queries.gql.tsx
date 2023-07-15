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

export const createVerification = gql`
  mutation createVerification(
    $createVerificationInput: CreateVerificationInput!
  ) {
    createVerification(createVerificationInput: $createVerificationInput) {
      adminId
      createdAt
      garageId
      updatedAt
      verified
    }
  }
`

export const removeVerification = gql`
  mutation removeVerification($where: VerificationWhereUniqueInput) {
    removeVerification(where: $where) {
      verified
      updatedAt
      garageId
      createdAt
      adminId
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
      verification {
        verified
      }
      address {
        address
        lat
        lng
      }
      slotCounts {
        type
        count
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
      services {
        id
        name
        description
        price
        duration
      }
      images
      displayName
      availableSlots(slotsFilter: $slotsFilter, dateFilter: $dateFilter) {
        type
        count
        pricePerHour
      }
    }
    searchGaragesCount(
      dateFilter: $dateFilter
      locationFilter: $locationFilter
      slotsFilter: $slotsFilter
    ) {
      count
    }
  }
`

export const searchGaragesCount = gql`
  query searchGaragesCount(
    $dateFilter: DateFilterInput!
    $locationFilter: LocationFilterInput!
    $slotsFilter: SlotWhereInput
  ) {
    searchGaragesCount(
      dateFilter: $dateFilter
      locationFilter: $locationFilter
      slotsFilter: $slotsFilter
    ) {
      count
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

export const BOOKING_FRAGMENT = gql`
  fragment BookingFields on Booking {
    id
    pricePerHour
    endTime
    startTime
    vehicleNumber
    passcode
    status
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
      ...BookingFields
    }

    bookingsCount(where: $where) {
      count
    }
  }
  ${BOOKING_FRAGMENT}
`

export const bookingsForGarage = gql`
  query bookingsForGarage(
    $distinct: [BookingScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: BookingWhereUniqueInput
    $orderBy: [BookingOrderByWithRelationInput!]
    $where: BookingWhereInput
  ) {
    bookingsForGarage(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
    ) {
      ...BookingFields
    }

    bookingsCount(where: $where) {
      count
    }
  }
  ${BOOKING_FRAGMENT}
`

export const createBookingTimeline = gql`
  mutation createBookingTimeline(
    $createBookingTimelineInput: CreateBookingTimelineInput!
  ) {
    createBookingTimeline(
      createBookingTimelineInput: $createBookingTimelineInput
    ) {
      bookingId
      id
      managerId
      status
      timestamp
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

export const createAdmin = gql`
  mutation createAdmin($createAdminInput: RegisterInput!) {
    createAdmin(createAdminInput: $createAdminInput) {
      createdAt
      displayName
      uid
      updatedAt
    }
  }
`
export const removeAdmin = gql`
  mutation removeAdmin($where: AdminWhereUniqueInput) {
    removeAdmin(where: $where) {
      createdAt
      displayName
      updatedAt
      uid
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
      verificationsCount
    }
    adminsCount(where: $where) {
      count
    }
  }
`

export const valetPickups = gql`
  query valetPickups(
    $distinct: [BookingScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: BookingWhereUniqueInput
    $orderBy: [BookingOrderByWithRelationInput!]
    $where: BookingWhereInput
  ) {
    valetPickups(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
    ) {
      id
      vehicleNumber
      startTime
      endTime
      valetAssignment {
        pickupLat
        pickupLng
        pickupValetId
      }
      slot {
        garage {
          address {
            lat
            lng
          }
        }
      }
    }
  }
`

export const valetDrops = gql`
  query valetDrops(
    $distinct: [BookingScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: BookingWhereUniqueInput
    $orderBy: [BookingOrderByWithRelationInput!]
    $where: BookingWhereInput
  ) {
    valetDrops(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
    ) {
      id
      vehicleNumber
      startTime
      endTime
      valetAssignment {
        returnLat
        returnLng
        returnValetId
      }
      slot {
        garage {
          address {
            lat
            lng
          }
        }
      }
    }
  }
`

export const valets = gql`
  query valets(
    $distinct: [ValetScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: ValetWhereUniqueInput
    $orderBy: [ValetOrderByWithRelationInput!]
    $where: ValetWhereInput
  ) {
    valets(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
    ) {
      updatedAt
      uid
      displayName
      createdAt
      companyId
      image
    }
  }
`

export const companyValets = gql`
  query companyValets(
    $distinct: [ValetScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: ValetWhereUniqueInput
    $orderBy: [ValetOrderByWithRelationInput!]
    $where: ValetWhereInput
  ) {
    companyValets(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
    ) {
      displayName
      uid
      createdAt
      updatedAt
      companyId
      image
    }
  }
`

export const createValet = gql`
  mutation createValet($createValetInput: CreateValetInput!) {
    createValet(createValetInput: $createValetInput) {
      uid
      displayName
      createdAt
      updatedAt
      companyId
    }
  }
`
