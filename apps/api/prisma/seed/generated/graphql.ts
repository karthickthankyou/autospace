/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type Address = {
  __typename?: 'Address'
  address: Scalars['String']
  createdAt: Scalars['DateTime']
  garage: Garage
  garageId: Scalars['Int']
  id: Scalars['Int']
  lat: Scalars['Float']
  lng: Scalars['Float']
  updatedAt: Scalars['DateTime']
}

export type AddressOrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  garage?: InputMaybe<GarageOrderByWithRelationInput>
  garageId?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  lat?: InputMaybe<SortOrder>
  lng?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type AddressRelationFilter = {
  is?: InputMaybe<AddressWhereInput>
  isNot?: InputMaybe<AddressWhereInput>
}

export enum AddressScalarFieldEnum {
  Address = 'address',
  CreatedAt = 'createdAt',
  GarageId = 'garageId',
  Id = 'id',
  Lat = 'lat',
  Lng = 'lng',
  UpdatedAt = 'updatedAt',
}

export type AddressWhereInput = {
  AND?: InputMaybe<Array<AddressWhereInput>>
  NOT?: InputMaybe<Array<AddressWhereInput>>
  OR?: InputMaybe<Array<AddressWhereInput>>
  address?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  garage?: InputMaybe<GarageRelationFilter>
  garageId?: InputMaybe<IntFilter>
  id?: InputMaybe<StringFilter>
  lat?: InputMaybe<FloatFilter>
  lng?: InputMaybe<FloatFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type AddressWhereUniqueInput = {
  garageId?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
}

export type Admin = {
  __typename?: 'Admin'
  createdAt: Scalars['DateTime']
  displayName?: Maybe<Scalars['String']>
  uid: Scalars['String']
  updatedAt: Scalars['DateTime']
  verifications: Array<Verification>
  verificationsCount: Scalars['Int']
}

export type AdminOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  displayName?: InputMaybe<SortOrder>
  uid?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
  verifications?: InputMaybe<VerificationOrderByRelationAggregateInput>
}

export type AdminRelationFilter = {
  is?: InputMaybe<AdminWhereInput>
  isNot?: InputMaybe<AdminWhereInput>
}

export enum AdminScalarFieldEnum {
  CreatedAt = 'createdAt',
  DisplayName = 'displayName',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type AdminWhereInput = {
  AND?: InputMaybe<Array<AdminWhereInput>>
  NOT?: InputMaybe<Array<AdminWhereInput>>
  OR?: InputMaybe<Array<AdminWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  displayName?: InputMaybe<StringFilter>
  uid?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
  verifications?: InputMaybe<VerificationListRelationFilter>
}

export type AdminWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>
}

export type AggregateCountOutput = {
  __typename?: 'AggregateCountOutput'
  count: Scalars['Int']
}

export type Booking = {
  __typename?: 'Booking'
  createdAt: Scalars['DateTime']
  customer: Customer
  customerId: Scalars['String']
  endTime: Scalars['DateTime']
  id: Scalars['Int']
  passcode?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  pricePerHour?: Maybe<Scalars['Int']>
  slot: Slot
  slotId: Scalars['Int']
  startTime: Scalars['DateTime']
  status: BookingStatus
  totalPrice?: Maybe<Scalars['Int']>
  updatedAt: Scalars['DateTime']
  vehicleNumber: Scalars['String']
}

export type BookingListRelationFilter = {
  every?: InputMaybe<BookingWhereInput>
  none?: InputMaybe<BookingWhereInput>
  some?: InputMaybe<BookingWhereInput>
}

export type BookingOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type BookingOrderByWithRelationInput = {
  bookingTimeline?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  customer?: InputMaybe<CustomerOrderByWithRelationInput>
  customerId?: InputMaybe<SortOrder>
  endTime?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  passcode?: InputMaybe<SortOrder>
  phoneNumber?: InputMaybe<SortOrder>
  pricePerHour?: InputMaybe<SortOrder>
  services?: InputMaybe<ServiceOrderByRelationAggregateInput>
  slot?: InputMaybe<SlotOrderByWithRelationInput>
  slotId?: InputMaybe<SortOrder>
  startTime?: InputMaybe<SortOrder>
  status?: InputMaybe<SortOrder>
  totalPrice?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
  valetAssignment?: InputMaybe<ValetAssignmentOrderByWithRelationInput>
  vehicleNumber?: InputMaybe<SortOrder>
}

export type BookingRelationFilter = {
  is?: InputMaybe<BookingWhereInput>
  isNot?: InputMaybe<BookingWhereInput>
}

export enum BookingScalarFieldEnum {
  CreatedAt = 'createdAt',
  CustomerId = 'customerId',
  EndTime = 'endTime',
  Id = 'id',
  Passcode = 'passcode',
  PhoneNumber = 'phoneNumber',
  PricePerHour = 'pricePerHour',
  SlotId = 'slotId',
  StartTime = 'startTime',
  Status = 'status',
  TotalPrice = 'totalPrice',
  UpdatedAt = 'updatedAt',
  VehicleNumber = 'vehicleNumber',
}

export enum BookingStatus {
  Booked = 'BOOKED',
  CheckedIn = 'CHECKED_IN',
  CheckedOut = 'CHECKED_OUT',
  ValetAssignedForCheckIn = 'VALET_ASSIGNED_FOR_CHECK_IN',
  ValetAssignedForCheckOut = 'VALET_ASSIGNED_FOR_CHECK_OUT',
  ValetPickedUp = 'VALET_PICKED_UP',
  ValetReturned = 'VALET_RETURNED',
}

export type BookingTimeline = {
  __typename?: 'BookingTimeline'
  bookingId: Scalars['Int']
  id: Scalars['Int']
  managerId: Scalars['String']
  status: BookingStatus
  timestamp: Scalars['DateTime']
  valetId?: Maybe<Scalars['String']>
}

export type BookingTimelineListRelationFilter = {
  every?: InputMaybe<BookingTimelineWhereInput>
  none?: InputMaybe<BookingTimelineWhereInput>
  some?: InputMaybe<BookingTimelineWhereInput>
}

export type BookingTimelineOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type BookingTimelineOrderByWithRelationInput = {
  booking?: InputMaybe<BookingOrderByWithRelationInput>
  bookingId?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  manager?: InputMaybe<ManagerOrderByWithRelationInput>
  managerId?: InputMaybe<SortOrder>
  status?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  valet?: InputMaybe<ValetOrderByWithRelationInput>
  valetId?: InputMaybe<SortOrder>
}

export enum BookingTimelineScalarFieldEnum {
  BookingId = 'bookingId',
  Id = 'id',
  ManagerId = 'managerId',
  Status = 'status',
  Timestamp = 'timestamp',
  ValetId = 'valetId',
}

export type BookingTimelineWhereInput = {
  AND?: InputMaybe<Array<BookingTimelineWhereInput>>
  NOT?: InputMaybe<Array<BookingTimelineWhereInput>>
  OR?: InputMaybe<Array<BookingTimelineWhereInput>>
  booking?: InputMaybe<BookingRelationFilter>
  bookingId?: InputMaybe<IntFilter>
  id?: InputMaybe<IntFilter>
  manager?: InputMaybe<ManagerRelationFilter>
  managerId?: InputMaybe<StringFilter>
  status?: InputMaybe<EnumBookingStatusFilter>
  timestamp?: InputMaybe<DateTimeFilter>
  valet?: InputMaybe<ValetRelationFilter>
  valetId?: InputMaybe<StringFilter>
}

export type BookingTimelineWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type BookingWhereInput = {
  AND?: InputMaybe<Array<BookingWhereInput>>
  NOT?: InputMaybe<Array<BookingWhereInput>>
  OR?: InputMaybe<Array<BookingWhereInput>>
  bookingTimeline?: InputMaybe<BookingTimelineListRelationFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  customer?: InputMaybe<CustomerRelationFilter>
  customerId?: InputMaybe<StringFilter>
  endTime?: InputMaybe<DateTimeFilter>
  id?: InputMaybe<IntFilter>
  passcode?: InputMaybe<StringFilter>
  phoneNumber?: InputMaybe<StringFilter>
  pricePerHour?: InputMaybe<FloatFilter>
  services?: InputMaybe<ServiceListRelationFilter>
  slot?: InputMaybe<SlotRelationFilter>
  slotId?: InputMaybe<IntFilter>
  startTime?: InputMaybe<DateTimeFilter>
  status?: InputMaybe<EnumBookingStatusFilter>
  totalPrice?: InputMaybe<FloatFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
  valetAssignment?: InputMaybe<ValetAssignmentRelationFilter>
  vehicleNumber?: InputMaybe<StringFilter>
}

export type BookingWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>
  not?: InputMaybe<Scalars['Boolean']>
}

export type Company = {
  __typename?: 'Company'
  createdAt: Scalars['DateTime']
  displayName: Scalars['String']
  garages: Array<Garage>
  id: Scalars['Int']
  managers: Array<Manager>
  updatedAt: Scalars['DateTime']
}

export type CompanyOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  displayName?: InputMaybe<SortOrder>
  garages?: InputMaybe<GarageOrderByRelationAggregateInput>
  id?: InputMaybe<SortOrder>
  managers?: InputMaybe<ManagerOrderByRelationAggregateInput>
  updatedAt?: InputMaybe<SortOrder>
  valets?: InputMaybe<ValetOrderByRelationAggregateInput>
}

export type CompanyRelationFilter = {
  is?: InputMaybe<CompanyWhereInput>
  isNot?: InputMaybe<CompanyWhereInput>
}

export enum CompanyScalarFieldEnum {
  CreatedAt = 'createdAt',
  DisplayName = 'displayName',
  Id = 'id',
  UpdatedAt = 'updatedAt',
}

export type CompanyWhereInput = {
  AND?: InputMaybe<Array<CompanyWhereInput>>
  NOT?: InputMaybe<Array<CompanyWhereInput>>
  OR?: InputMaybe<Array<CompanyWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  displayName?: InputMaybe<StringFilter>
  garages?: InputMaybe<GarageListRelationFilter>
  id?: InputMaybe<IntFilter>
  managers?: InputMaybe<ManagerListRelationFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
  valets?: InputMaybe<ValetListRelationFilter>
}

export type CompanyWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type CreateAddressInput = {
  address: Scalars['String']
  garageId: Scalars['Int']
  lat: Scalars['Float']
  lng: Scalars['Float']
}

export type CreateAddressInputWithoutGarageId = {
  address: Scalars['String']
  lat: Scalars['Float']
  lng: Scalars['Float']
}

export type CreateBookingInput = {
  customerId: Scalars['String']
  endTime: Scalars['DateTime']
  garageId: Scalars['Int']
  phoneNumber?: InputMaybe<Scalars['String']>
  startTime: Scalars['DateTime']
  type: SlotType
  valetAssignment?: InputMaybe<CreateValetAssignmentInputWithoutBookingId>
  vehicleNumber: Scalars['String']
}

export type CreateBookingTimelineInput = {
  bookingId: Scalars['Int']
  status: BookingStatus
}

export type CreateCompanyInput = {
  displayName: Scalars['String']
  managerDisplayName: Scalars['String']
}

export type CreateCustomerInput = {
  displayName: Scalars['String']
  uid: Scalars['String']
}

export type CreateGarageInput = {
  address: CreateAddressInputWithoutGarageId
  description?: InputMaybe<Scalars['String']>
  displayName: Scalars['String']
  images?: InputMaybe<Array<Scalars['String']>>
  slots: Array<CreateSlotInputWithoutGarageId>
}

export type CreateManagerInput = {
  companyId: Scalars['Int']
  displayName: Scalars['String']
  uid: Scalars['String']
}

export type CreateReviewInput = {
  comment: Scalars['String']
  customerId: Scalars['String']
  garageId: Scalars['Int']
  rating: Scalars['Int']
}

export type CreateServiceInput = {
  description: Scalars['String']
  duration: Scalars['Int']
  garageId: Scalars['Int']
  name: Scalars['String']
  price: Scalars['Int']
}

export type CreateSlotInput = {
  displayName?: InputMaybe<Scalars['String']>
  garageId: Scalars['Int']
  height?: InputMaybe<Scalars['Int']>
  length?: InputMaybe<Scalars['Int']>
  pricePerHour: Scalars['Int']
  type?: InputMaybe<SlotType>
  width?: InputMaybe<Scalars['Int']>
}

export type CreateSlotInputWithoutGarageId = {
  count: Scalars['Int']
  displayName?: InputMaybe<Scalars['String']>
  height?: InputMaybe<Scalars['Int']>
  length?: InputMaybe<Scalars['Int']>
  pricePerHour: Scalars['Int']
  type?: InputMaybe<SlotType>
  width?: InputMaybe<Scalars['Int']>
}

export type CreateValetAssignmentInputWithoutBookingId = {
  pickupLat: Scalars['Float']
  pickupLng: Scalars['Float']
  returnLat?: InputMaybe<Scalars['Float']>
  returnLng?: InputMaybe<Scalars['Float']>
}

export type CreateVerificationInput = {
  adminId: Scalars['String']
  garageId: Scalars['Int']
  verified: Scalars['Boolean']
}

export type Customer = {
  __typename?: 'Customer'
  bookings: Array<Booking>
  createdAt: Scalars['DateTime']
  displayName: Scalars['String']
  uid: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type CustomerOrderByWithRelationInput = {
  bookings?: InputMaybe<BookingOrderByRelationAggregateInput>
  createdAt?: InputMaybe<SortOrder>
  displayName?: InputMaybe<SortOrder>
  reviews?: InputMaybe<ReviewOrderByRelationAggregateInput>
  uid?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type CustomerRelationFilter = {
  is?: InputMaybe<CustomerWhereInput>
  isNot?: InputMaybe<CustomerWhereInput>
}

export enum CustomerScalarFieldEnum {
  CreatedAt = 'createdAt',
  DisplayName = 'displayName',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type CustomerWhereInput = {
  AND?: InputMaybe<Array<CustomerWhereInput>>
  NOT?: InputMaybe<Array<CustomerWhereInput>>
  OR?: InputMaybe<Array<CustomerWhereInput>>
  bookings?: InputMaybe<BookingListRelationFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  displayName?: InputMaybe<StringFilter>
  reviews?: InputMaybe<ReviewListRelationFilter>
  uid?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type CustomerWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>
}

export type DateFilterInput = {
  end: Scalars['String']
  start: Scalars['String']
}

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<Scalars['String']>>
}

export type EnumBookingStatusFilter = {
  equals?: InputMaybe<BookingStatus>
  in?: InputMaybe<Array<BookingStatus>>
  not?: InputMaybe<BookingStatus>
  notIn?: InputMaybe<Array<BookingStatus>>
}

export type EnumSlotTypeFilter = {
  equals?: InputMaybe<SlotType>
  in?: InputMaybe<Array<SlotType>>
  not?: InputMaybe<SlotType>
  notIn?: InputMaybe<Array<SlotType>>
}

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>
  gt?: InputMaybe<Scalars['Float']>
  gte?: InputMaybe<Scalars['Float']>
  in?: InputMaybe<Scalars['Float']>
  lt?: InputMaybe<Scalars['Float']>
  lte?: InputMaybe<Scalars['Float']>
  not?: InputMaybe<Scalars['Float']>
  notIn?: InputMaybe<Scalars['Float']>
}

export type Garage = {
  __typename?: 'Garage'
  address: Address
  availableSlots: Array<MinimalSlotGroupBy>
  company: Company
  companyId: Scalars['Int']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  displayName: Scalars['String']
  id: Scalars['Int']
  images?: Maybe<Array<Scalars['String']>>
  services?: Maybe<Array<Service>>
  slotCounts: Array<SlotTypeCount>
  slots: Array<Slot>
  updatedAt: Scalars['DateTime']
  verification?: Maybe<Verification>
}

export type GarageAvailableSlotsArgs = {
  dateFilter: DateFilterInput
  slotsFilter?: InputMaybe<SlotWhereInput>
}

export type GarageFilter = {
  orderBy?: InputMaybe<Array<GarageOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<GarageWhereInput>
}

export type GarageListRelationFilter = {
  every?: InputMaybe<GarageWhereInput>
  none?: InputMaybe<GarageWhereInput>
  some?: InputMaybe<GarageWhereInput>
}

export type GarageOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type GarageOrderByWithRelationInput = {
  address?: InputMaybe<AddressOrderByWithRelationInput>
  company?: InputMaybe<CompanyOrderByWithRelationInput>
  companyId?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  displayName?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  images?: InputMaybe<SortOrder>
  reviews?: InputMaybe<ReviewOrderByRelationAggregateInput>
  services?: InputMaybe<ServiceOrderByRelationAggregateInput>
  slots?: InputMaybe<SlotOrderByRelationAggregateInput>
  updatedAt?: InputMaybe<SortOrder>
  verification?: InputMaybe<VerificationOrderByWithRelationInput>
}

export type GarageRelationFilter = {
  is?: InputMaybe<GarageWhereInput>
  isNot?: InputMaybe<GarageWhereInput>
}

export enum GarageScalarFieldEnum {
  CompanyId = 'companyId',
  CreatedAt = 'createdAt',
  Description = 'description',
  DisplayName = 'displayName',
  Id = 'id',
  Images = 'images',
  UpdatedAt = 'updatedAt',
}

export type GarageWhereInput = {
  AND?: InputMaybe<Array<GarageWhereInput>>
  NOT?: InputMaybe<Array<GarageWhereInput>>
  OR?: InputMaybe<Array<GarageWhereInput>>
  address?: InputMaybe<AddressRelationFilter>
  company?: InputMaybe<CompanyRelationFilter>
  companyId?: InputMaybe<IntFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  description?: InputMaybe<StringFilter>
  displayName?: InputMaybe<StringFilter>
  id?: InputMaybe<IntFilter>
  images?: InputMaybe<StringListFilter>
  reviews?: InputMaybe<ReviewListRelationFilter>
  services?: InputMaybe<ServiceListRelationFilter>
  slots?: InputMaybe<SlotListRelationFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
  verification?: InputMaybe<VerificationRelationFilter>
}

export type GarageWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>
  gt?: InputMaybe<Scalars['Int']>
  gte?: InputMaybe<Scalars['Int']>
  in?: InputMaybe<Scalars['Int']>
  lt?: InputMaybe<Scalars['Int']>
  lte?: InputMaybe<Scalars['Int']>
  not?: InputMaybe<Scalars['Int']>
  notIn?: InputMaybe<Scalars['Int']>
}

export type LocationFilterInput = {
  nw_lat: Scalars['Float']
  nw_lng: Scalars['Float']
  se_lat: Scalars['Float']
  se_lng: Scalars['Float']
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginOutput = {
  __typename?: 'LoginOutput'
  displayName: Scalars['String']
  email: Scalars['String']
  expiresIn: Scalars['String']
  idToken: Scalars['String']
  kind: Scalars['String']
  localId: Scalars['String']
  refreshToken: Scalars['String']
}

export type Manager = {
  __typename?: 'Manager'
  company: Company
  companyId: Scalars['Int']
  createdAt: Scalars['DateTime']
  displayName: Scalars['String']
  uid: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type ManagerListRelationFilter = {
  every: ManagerWhereInput
  none: ManagerWhereInput
  some: ManagerWhereInput
}

export type ManagerOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ManagerOrderByWithRelationInput = {
  BookingTimeline?: InputMaybe<BookingTimelineOrderByRelationAggregateInput>
  company?: InputMaybe<CompanyOrderByWithRelationInput>
  companyId?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  displayName?: InputMaybe<SortOrder>
  uid?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type ManagerRelationFilter = {
  is?: InputMaybe<ManagerWhereInput>
  isNot?: InputMaybe<ManagerWhereInput>
}

export enum ManagerScalarFieldEnum {
  CompanyId = 'companyId',
  CreatedAt = 'createdAt',
  DisplayName = 'displayName',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type ManagerWhereInput = {
  AND?: InputMaybe<Array<ManagerWhereInput>>
  BookingTimeline?: InputMaybe<BookingTimelineListRelationFilter>
  NOT?: InputMaybe<Array<ManagerWhereInput>>
  OR?: InputMaybe<Array<ManagerWhereInput>>
  company?: InputMaybe<CompanyRelationFilter>
  companyId?: InputMaybe<IntFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  displayName?: InputMaybe<StringFilter>
  uid?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type ManagerWhereUniqueInput = {
  companyId?: InputMaybe<Scalars['Int']>
  uid?: InputMaybe<Scalars['String']>
}

export type MinimalSlotGroupBy = {
  __typename?: 'MinimalSlotGroupBy'
  count: Scalars['Int']
  pricePerHour: Scalars['Int']
  type?: Maybe<SlotType>
}

export type Mutation = {
  __typename?: 'Mutation'
  createAddress: Address
  createAdmin: Admin
  createBooking: Booking
  createBookingTimeline: BookingTimeline
  createCompany: Company
  createCustomer: Customer
  createGarage: Garage
  createManager: Manager
  createManySlots: ReturnCount
  createReview: Review
  createService: Service
  createSlot: Slot
  createVerification: Verification
  login: LoginOutput
  logout: Scalars['Boolean']
  refreshToken: RefreshTokenOutput
  register: RegisterOutput
  removeAddress: Address
  removeAdmin: Admin
  removeBookingTimeline: BookingTimeline
  removeCompany: Company
  removeCustomer: Customer
  removeGarage: Garage
  removeManager: Manager
  removeReview: Review
  removeService: Service
  removeSlot: Slot
  removeVerification: Verification
  setAdmin: Scalars['Boolean']
  setRole: Scalars['Boolean']
  updateAddress: Address
  updateAdmin: Admin
  updateBookingTimeline: BookingTimeline
  updateCompany: Company
  updateCustomer: Customer
  updateGarage: Garage
  updateManager: Manager
  updateReview: Review
  updateService: Service
  updateSlot: Slot
  updateVerification: Verification
}

export type MutationCreateAddressArgs = {
  createAddressInput: CreateAddressInput
}

export type MutationCreateAdminArgs = {
  createAdminInput: RegisterInput
}

export type MutationCreateBookingArgs = {
  createBookingInput: CreateBookingInput
}

export type MutationCreateBookingTimelineArgs = {
  createBookingTimelineInput: CreateBookingTimelineInput
}

export type MutationCreateCompanyArgs = {
  createCompanyInput: CreateCompanyInput
}

export type MutationCreateCustomerArgs = {
  createCustomerInput: CreateCustomerInput
}

export type MutationCreateGarageArgs = {
  createGarageInput: CreateGarageInput
}

export type MutationCreateManagerArgs = {
  createManagerInput: CreateManagerInput
}

export type MutationCreateManySlotsArgs = {
  slots: Array<CreateSlotInput>
}

export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput
}

export type MutationCreateServiceArgs = {
  createServiceInput: CreateServiceInput
}

export type MutationCreateSlotArgs = {
  createSlotInput: CreateSlotInput
}

export type MutationCreateVerificationArgs = {
  createVerificationInput: CreateVerificationInput
}

export type MutationLoginArgs = {
  credentials: LoginInput
}

export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput
}

export type MutationRegisterArgs = {
  credentials: RegisterInput
}

export type MutationRemoveAddressArgs = {
  where?: InputMaybe<AddressWhereUniqueInput>
}

export type MutationRemoveAdminArgs = {
  where?: InputMaybe<AdminWhereUniqueInput>
}

export type MutationRemoveBookingTimelineArgs = {
  where?: InputMaybe<BookingTimelineWhereUniqueInput>
}

export type MutationRemoveCompanyArgs = {
  where?: InputMaybe<CompanyWhereUniqueInput>
}

export type MutationRemoveCustomerArgs = {
  where?: InputMaybe<CustomerWhereUniqueInput>
}

export type MutationRemoveGarageArgs = {
  where?: InputMaybe<GarageWhereUniqueInput>
}

export type MutationRemoveManagerArgs = {
  where?: InputMaybe<ManagerWhereUniqueInput>
}

export type MutationRemoveReviewArgs = {
  where?: InputMaybe<ReviewWhereUniqueInput>
}

export type MutationRemoveServiceArgs = {
  where?: InputMaybe<ServiceWhereUniqueInput>
}

export type MutationRemoveSlotArgs = {
  where?: InputMaybe<SlotWhereUniqueInput>
}

export type MutationRemoveVerificationArgs = {
  where?: InputMaybe<VerificationWhereUniqueInput>
}

export type MutationSetAdminArgs = {
  uid: Scalars['String']
}

export type MutationSetRoleArgs = {
  setRoleInput: SetRoleInput
}

export type MutationUpdateAddressArgs = {
  updateAddressInput: UpdateAddressInput
}

export type MutationUpdateAdminArgs = {
  updateAdminInput: UpdateAdminInput
}

export type MutationUpdateBookingTimelineArgs = {
  updateBookingTimelineInput: UpdateBookingTimelineInput
}

export type MutationUpdateCompanyArgs = {
  updateCompanyInput: UpdateCompanyInput
}

export type MutationUpdateCustomerArgs = {
  updateCustomerInput: UpdateCustomerInput
}

export type MutationUpdateGarageArgs = {
  updateGarageInput: UpdateGarageInput
}

export type MutationUpdateManagerArgs = {
  updateManagerInput: UpdateManagerInput
}

export type MutationUpdateReviewArgs = {
  updateReviewInput: UpdateReviewInput
}

export type MutationUpdateServiceArgs = {
  updateServiceInput: UpdateServiceInput
}

export type MutationUpdateSlotArgs = {
  updateSlotInput: UpdateSlotInput
}

export type MutationUpdateVerificationArgs = {
  updateVerificationInput: UpdateVerificationInput
}

export type Query = {
  __typename?: 'Query'
  address: Address
  addresses: Array<Address>
  admin: Admin
  admins: Array<Admin>
  adminsCount: AggregateCountOutput
  booking: Booking
  bookingTimeline: BookingTimeline
  bookingTimelines: Array<BookingTimeline>
  bookings: Array<Booking>
  bookingsCount: AggregateCountOutput
  bookingsForGarage: Array<Booking>
  companies: Array<Company>
  company: Company
  customer: Customer
  customers: Array<Customer>
  garage: Garage
  garages: Array<Garage>
  garagesCount: AggregateCountOutput
  manager: Manager
  managers: Array<Manager>
  myCompany: Company
  review: Review
  reviews: Array<Review>
  searchGarages: Array<Garage>
  searchGaragesCount: AggregateCountOutput
  service: Service
  services: Array<Service>
  slot: Slot
  slots: Array<Slot>
  verification: Verification
  verifications: Array<Verification>
}

export type QueryAddressArgs = {
  where?: InputMaybe<AddressWhereUniqueInput>
}

export type QueryAddressesArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>
  distinct?: InputMaybe<Array<AddressScalarFieldEnum>>
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<AddressWhereInput>
}

export type QueryAdminArgs = {
  where?: InputMaybe<AdminWhereUniqueInput>
}

export type QueryAdminsArgs = {
  cursor?: InputMaybe<AdminWhereUniqueInput>
  distinct?: InputMaybe<Array<AdminScalarFieldEnum>>
  orderBy?: InputMaybe<Array<AdminOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<AdminWhereInput>
}

export type QueryAdminsCountArgs = {
  where?: InputMaybe<AdminWhereInput>
}

export type QueryBookingArgs = {
  where?: InputMaybe<BookingWhereUniqueInput>
}

export type QueryBookingTimelineArgs = {
  where?: InputMaybe<BookingTimelineWhereUniqueInput>
}

export type QueryBookingTimelinesArgs = {
  cursor?: InputMaybe<BookingTimelineWhereUniqueInput>
  distinct?: InputMaybe<Array<BookingTimelineScalarFieldEnum>>
  orderBy?: InputMaybe<Array<BookingTimelineOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<BookingTimelineWhereInput>
}

export type QueryBookingsArgs = {
  cursor?: InputMaybe<BookingWhereUniqueInput>
  distinct?: InputMaybe<Array<BookingScalarFieldEnum>>
  orderBy?: InputMaybe<Array<BookingOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<BookingWhereInput>
}

export type QueryBookingsCountArgs = {
  where?: InputMaybe<BookingWhereInput>
}

export type QueryBookingsForGarageArgs = {
  cursor?: InputMaybe<BookingWhereUniqueInput>
  distinct?: InputMaybe<Array<BookingScalarFieldEnum>>
  orderBy?: InputMaybe<Array<BookingOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<BookingWhereInput>
}

export type QueryCompaniesArgs = {
  cursor?: InputMaybe<CompanyWhereUniqueInput>
  distinct?: InputMaybe<Array<CompanyScalarFieldEnum>>
  orderBy?: InputMaybe<Array<CompanyOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<CompanyWhereInput>
}

export type QueryCompanyArgs = {
  where?: InputMaybe<CompanyWhereUniqueInput>
}

export type QueryCustomerArgs = {
  where?: InputMaybe<CustomerWhereUniqueInput>
}

export type QueryCustomersArgs = {
  cursor?: InputMaybe<CustomerWhereUniqueInput>
  distinct?: InputMaybe<Array<CustomerScalarFieldEnum>>
  orderBy?: InputMaybe<Array<CustomerOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<CustomerWhereInput>
}

export type QueryGarageArgs = {
  where?: InputMaybe<GarageWhereUniqueInput>
}

export type QueryGaragesArgs = {
  cursor?: InputMaybe<GarageWhereUniqueInput>
  distinct?: InputMaybe<Array<GarageScalarFieldEnum>>
  orderBy?: InputMaybe<Array<GarageOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<GarageWhereInput>
}

export type QueryGaragesCountArgs = {
  where?: InputMaybe<GarageWhereInput>
}

export type QueryManagerArgs = {
  where?: InputMaybe<ManagerWhereUniqueInput>
}

export type QueryManagersArgs = {
  cursor?: InputMaybe<ManagerWhereUniqueInput>
  distinct?: InputMaybe<Array<ManagerScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ManagerOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ManagerWhereInput>
}

export type QueryReviewArgs = {
  where?: InputMaybe<ReviewWhereUniqueInput>
}

export type QueryReviewsArgs = {
  cursor?: InputMaybe<ReviewWhereUniqueInput>
  distinct?: InputMaybe<Array<ReviewScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ReviewOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ReviewWhereInput>
}

export type QuerySearchGaragesArgs = {
  dateFilter: DateFilterInput
  garageFilter?: InputMaybe<GarageFilter>
  locationFilter: LocationFilterInput
  slotsFilter?: InputMaybe<SlotWhereInput>
}

export type QuerySearchGaragesCountArgs = {
  dateFilter: DateFilterInput
  locationFilter: LocationFilterInput
  slotsFilter?: InputMaybe<SlotWhereInput>
}

export type QueryServiceArgs = {
  where?: InputMaybe<ServiceWhereUniqueInput>
}

export type QueryServicesArgs = {
  cursor?: InputMaybe<ServiceWhereUniqueInput>
  distinct?: InputMaybe<Array<ServiceScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ServiceOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ServiceWhereInput>
}

export type QuerySlotArgs = {
  where?: InputMaybe<SlotWhereUniqueInput>
}

export type QuerySlotsArgs = {
  cursor?: InputMaybe<SlotWhereUniqueInput>
  distinct?: InputMaybe<Array<SlotScalarFieldEnum>>
  orderBy?: InputMaybe<Array<SlotOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SlotWhereInput>
}

export type QueryVerificationArgs = {
  where?: InputMaybe<VerificationWhereUniqueInput>
}

export type QueryVerificationsArgs = {
  cursor?: InputMaybe<VerificationWhereUniqueInput>
  distinct?: InputMaybe<Array<VerificationScalarFieldEnum>>
  orderBy?: InputMaybe<Array<VerificationOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<VerificationWhereInput>
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type RefreshTokenInput = {
  refresh_token: Scalars['String']
}

export type RefreshTokenOutput = {
  __typename?: 'RefreshTokenOutput'
  access_token: Scalars['String']
  expires_in: Scalars['String']
  id_token: Scalars['String']
  project_id: Scalars['String']
  refresh_token: Scalars['String']
  token_type: Scalars['String']
  user_id: Scalars['String']
}

export type RegisterInput = {
  displayName?: InputMaybe<Scalars['String']>
  email: Scalars['String']
  password: Scalars['String']
}

export type RegisterOutput = {
  __typename?: 'RegisterOutput'
  displayName: Scalars['String']
  email: Scalars['String']
  expiresIn: Scalars['String']
  idToken: Scalars['String']
  kind: Scalars['String']
  localId: Scalars['String']
  refreshToken: Scalars['String']
}

export type ReturnCount = {
  __typename?: 'ReturnCount'
  count: Scalars['Int']
}

export type Review = {
  __typename?: 'Review'
  comment: Scalars['String']
  createdAt: Scalars['DateTime']
  customerId: Scalars['String']
  garageId: Scalars['Int']
  id: Scalars['Int']
  rating: Scalars['Int']
  updatedAt: Scalars['DateTime']
}

export type ReviewListRelationFilter = {
  every: ReviewWhereInput
  none: ReviewWhereInput
  some: ReviewWhereInput
}

export type ReviewOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ReviewOrderByWithRelationInput = {
  comment?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  customer?: InputMaybe<CustomerOrderByWithRelationInput>
  customerId?: InputMaybe<SortOrder>
  garage?: InputMaybe<GarageOrderByWithRelationInput>
  garageId?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  rating?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export enum ReviewScalarFieldEnum {
  Comment = 'comment',
  CreatedAt = 'createdAt',
  CustomerId = 'customerId',
  GarageId = 'garageId',
  Id = 'id',
  Rating = 'rating',
  UpdatedAt = 'updatedAt',
}

export type ReviewWhereInput = {
  AND?: InputMaybe<Array<ReviewWhereInput>>
  NOT?: InputMaybe<Array<ReviewWhereInput>>
  OR?: InputMaybe<Array<ReviewWhereInput>>
  comment?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  customer?: InputMaybe<CustomerRelationFilter>
  customerId?: InputMaybe<StringFilter>
  garage?: InputMaybe<GarageRelationFilter>
  garageId?: InputMaybe<IntFilter>
  id?: InputMaybe<IntFilter>
  rating?: InputMaybe<IntFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type ReviewWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

/** Enum for roles */
export enum RoleEnum {
  Admin = 'admin',
  Manager = 'manager',
}

export type Service = {
  __typename?: 'Service'
  bookingId: Scalars['Int']
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  duration: Scalars['Int']
  garageId: Scalars['Int']
  id: Scalars['Int']
  name: Scalars['String']
  price: Scalars['Int']
  updatedAt: Scalars['DateTime']
}

export type ServiceListRelationFilter = {
  every?: InputMaybe<ServiceWhereInput>
  none?: InputMaybe<ServiceWhereInput>
  some?: InputMaybe<ServiceWhereInput>
}

export type ServiceOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ServiceOrderByWithRelationInput = {
  Booking?: InputMaybe<BookingOrderByWithRelationInput>
  Garage?: InputMaybe<GarageOrderByWithRelationInput>
  bookingId?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  duration?: InputMaybe<SortOrder>
  garageId?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  price?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export enum ServiceScalarFieldEnum {
  BookingId = 'bookingId',
  CreatedAt = 'createdAt',
  Description = 'description',
  Duration = 'duration',
  GarageId = 'garageId',
  Id = 'id',
  Name = 'name',
  Price = 'price',
  UpdatedAt = 'updatedAt',
}

export type ServiceWhereInput = {
  AND?: InputMaybe<Array<ServiceWhereInput>>
  Booking?: InputMaybe<BookingRelationFilter>
  Garage?: InputMaybe<GarageRelationFilter>
  NOT?: InputMaybe<Array<ServiceWhereInput>>
  OR?: InputMaybe<Array<ServiceWhereInput>>
  bookingId?: InputMaybe<IntFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  description?: InputMaybe<StringFilter>
  duration?: InputMaybe<IntFilter>
  garageId?: InputMaybe<IntFilter>
  id?: InputMaybe<IntFilter>
  name?: InputMaybe<StringFilter>
  price?: InputMaybe<IntFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type ServiceWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type SetRoleInput = {
  role: RoleEnum
  uid: Scalars['String']
}

export type Slot = {
  __typename?: 'Slot'
  bookings: Array<Booking>
  createdAt: Scalars['DateTime']
  displayName?: Maybe<Scalars['String']>
  garage: Garage
  garageId: Scalars['Int']
  height?: Maybe<Scalars['Int']>
  id: Scalars['Int']
  length?: Maybe<Scalars['Int']>
  pricePerHour: Scalars['Int']
  type?: Maybe<SlotType>
  updatedAt: Scalars['DateTime']
  width?: Maybe<Scalars['Int']>
}

export type SlotListRelationFilter = {
  every?: InputMaybe<SlotWhereInput>
  none?: InputMaybe<SlotWhereInput>
  some?: InputMaybe<SlotWhereInput>
}

export type SlotOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type SlotOrderByWithRelationInput = {
  bookings?: InputMaybe<BookingOrderByRelationAggregateInput>
  createdAt?: InputMaybe<SortOrder>
  displayName?: InputMaybe<SortOrder>
  garage?: InputMaybe<GarageOrderByWithRelationInput>
  garageId?: InputMaybe<SortOrder>
  height?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  length?: InputMaybe<SortOrder>
  pricePerHour?: InputMaybe<SortOrder>
  type?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
  width?: InputMaybe<SortOrder>
}

export type SlotRelationFilter = {
  is?: InputMaybe<SlotWhereInput>
  isNot?: InputMaybe<SlotWhereInput>
}

export enum SlotScalarFieldEnum {
  CreatedAt = 'createdAt',
  DisplayName = 'displayName',
  GarageId = 'garageId',
  Height = 'height',
  Id = 'id',
  Length = 'length',
  PricePerHour = 'pricePerHour',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  Width = 'width',
}

export enum SlotType {
  Bicycle = 'BICYCLE',
  Bike = 'BIKE',
  Car = 'CAR',
  Heavy = 'HEAVY',
}

export type SlotTypeCount = {
  __typename?: 'SlotTypeCount'
  count: Scalars['Int']
  type: SlotType
}

export type SlotWhereInput = {
  AND?: InputMaybe<Array<SlotWhereInput>>
  NOT?: InputMaybe<Array<SlotWhereInput>>
  OR?: InputMaybe<Array<SlotWhereInput>>
  bookings?: InputMaybe<BookingListRelationFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  displayName?: InputMaybe<StringFilter>
  garage?: InputMaybe<GarageRelationFilter>
  garageId?: InputMaybe<IntFilter>
  height?: InputMaybe<IntFilter>
  id?: InputMaybe<IntFilter>
  length?: InputMaybe<IntFilter>
  pricePerHour?: InputMaybe<FloatFilter>
  type?: InputMaybe<EnumSlotTypeFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
  width?: InputMaybe<IntFilter>
}

export type SlotWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<Scalars['String']>>
  startsWith?: InputMaybe<Scalars['String']>
}

export type StringListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>
  has?: InputMaybe<Scalars['String']>
  hasEvery?: InputMaybe<Array<Scalars['String']>>
  hasSome?: InputMaybe<Array<Scalars['String']>>
  isEmpty?: InputMaybe<Scalars['Boolean']>
}

export type UpdateAddressInput = {
  address?: InputMaybe<Scalars['String']>
  garageId?: InputMaybe<Scalars['Int']>
  id: Scalars['Int']
  lat?: InputMaybe<Scalars['Float']>
  lng?: InputMaybe<Scalars['Float']>
}

export type UpdateAdminInput = {
  displayName?: InputMaybe<Scalars['String']>
  uid: Scalars['String']
}

export type UpdateBookingTimelineInput = {
  bookingId?: InputMaybe<Scalars['Int']>
  id: Scalars['Int']
  status?: InputMaybe<BookingStatus>
}

export type UpdateCompanyInput = {
  displayName?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  managerDisplayName?: InputMaybe<Scalars['String']>
}

export type UpdateCustomerInput = {
  displayName?: InputMaybe<Scalars['String']>
  uid: Scalars['String']
}

export type UpdateGarageInput = {
  address?: InputMaybe<CreateAddressInputWithoutGarageId>
  description?: InputMaybe<Scalars['String']>
  displayName?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  images?: InputMaybe<Array<Scalars['String']>>
  slots?: InputMaybe<Array<CreateSlotInputWithoutGarageId>>
}

export type UpdateManagerInput = {
  companyId?: InputMaybe<Scalars['Int']>
  displayName?: InputMaybe<Scalars['String']>
  uid?: InputMaybe<Scalars['String']>
}

export type UpdateReviewInput = {
  comment?: InputMaybe<Scalars['String']>
  customerId?: InputMaybe<Scalars['String']>
  garageId?: InputMaybe<Scalars['Int']>
  id: Scalars['Int']
  rating?: InputMaybe<Scalars['Int']>
}

export type UpdateServiceInput = {
  description?: InputMaybe<Scalars['String']>
  duration?: InputMaybe<Scalars['Int']>
  garageId?: InputMaybe<Scalars['Int']>
  id: Scalars['Int']
  name?: InputMaybe<Scalars['String']>
  price?: InputMaybe<Scalars['Int']>
}

export type UpdateSlotInput = {
  displayName?: InputMaybe<Scalars['String']>
  garageId?: InputMaybe<Scalars['Int']>
  height?: InputMaybe<Scalars['Int']>
  id: Scalars['Int']
  length?: InputMaybe<Scalars['Int']>
  pricePerHour?: InputMaybe<Scalars['Int']>
  type?: InputMaybe<SlotType>
  width?: InputMaybe<Scalars['Int']>
}

export type UpdateVerificationInput = {
  adminId?: InputMaybe<Scalars['String']>
  garageId: Scalars['Int']
  verified?: InputMaybe<Scalars['Boolean']>
}

export type ValetAssignmentListRelationFilter = {
  every?: InputMaybe<ValetAssignmentWhereInput>
  none?: InputMaybe<ValetAssignmentWhereInput>
  some?: InputMaybe<ValetAssignmentWhereInput>
}

export type ValetAssignmentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ValetAssignmentOrderByWithRelationInput = {
  booking?: InputMaybe<BookingOrderByWithRelationInput>
  bookingId?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  pickupLat?: InputMaybe<SortOrder>
  pickupLng?: InputMaybe<SortOrder>
  pickupValet?: InputMaybe<ValetOrderByWithRelationInput>
  pickupValetId?: InputMaybe<SortOrder>
  returnLat?: InputMaybe<SortOrder>
  returnLng?: InputMaybe<SortOrder>
  returnValet?: InputMaybe<ValetOrderByWithRelationInput>
  returnValetId?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type ValetAssignmentRelationFilter = {
  is?: InputMaybe<ValetAssignmentWhereInput>
  isNot?: InputMaybe<ValetAssignmentWhereInput>
}

export type ValetAssignmentWhereInput = {
  AND?: InputMaybe<Array<ValetAssignmentWhereInput>>
  NOT?: InputMaybe<Array<ValetAssignmentWhereInput>>
  OR?: InputMaybe<Array<ValetAssignmentWhereInput>>
  booking?: InputMaybe<BookingRelationFilter>
  bookingId?: InputMaybe<IntFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  pickupLat?: InputMaybe<FloatFilter>
  pickupLng?: InputMaybe<FloatFilter>
  pickupValet?: InputMaybe<ValetRelationFilter>
  pickupValetId?: InputMaybe<StringFilter>
  returnLat?: InputMaybe<FloatFilter>
  returnLng?: InputMaybe<FloatFilter>
  returnValet?: InputMaybe<ValetRelationFilter>
  returnValetId?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type ValetListRelationFilter = {
  every?: InputMaybe<ValetWhereInput>
  none?: InputMaybe<ValetWhereInput>
  some?: InputMaybe<ValetWhereInput>
}

export type ValetOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ValetOrderByWithRelationInput = {
  bookingTimeline?: InputMaybe<BookingTimelineOrderByRelationAggregateInput>
  company?: InputMaybe<CompanyOrderByWithRelationInput>
  companyId?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  displayName?: InputMaybe<SortOrder>
  pickupAssignments?: InputMaybe<ValetAssignmentOrderByRelationAggregateInput>
  returnAssignments?: InputMaybe<ValetAssignmentOrderByRelationAggregateInput>
  uid?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type ValetRelationFilter = {
  is?: InputMaybe<ValetWhereInput>
  isNot?: InputMaybe<ValetWhereInput>
}

export type ValetWhereInput = {
  AND?: InputMaybe<Array<ValetWhereInput>>
  NOT?: InputMaybe<Array<ValetWhereInput>>
  OR?: InputMaybe<Array<ValetWhereInput>>
  bookingTimeline?: InputMaybe<BookingTimelineListRelationFilter>
  company?: InputMaybe<CompanyRelationFilter>
  companyId?: InputMaybe<IntFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  displayName?: InputMaybe<StringFilter>
  pickupAssignments?: InputMaybe<ValetAssignmentListRelationFilter>
  returnAssignments?: InputMaybe<ValetAssignmentListRelationFilter>
  uid?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type Verification = {
  __typename?: 'Verification'
  adminId: Scalars['String']
  createdAt: Scalars['DateTime']
  garageId: Scalars['Int']
  updatedAt: Scalars['DateTime']
  verified: Scalars['Boolean']
}

export type VerificationListRelationFilter = {
  every?: InputMaybe<VerificationWhereInput>
  none?: InputMaybe<VerificationWhereInput>
  some?: InputMaybe<VerificationWhereInput>
}

export type VerificationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type VerificationOrderByWithRelationInput = {
  admin?: InputMaybe<AdminOrderByWithRelationInput>
  adminId?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  garage?: InputMaybe<GarageOrderByWithRelationInput>
  garageId?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
  verified?: InputMaybe<SortOrder>
}

export type VerificationRelationFilter = {
  is?: InputMaybe<VerificationWhereInput>
  isNot?: InputMaybe<VerificationWhereInput>
}

export enum VerificationScalarFieldEnum {
  AdminId = 'adminId',
  CreatedAt = 'createdAt',
  GarageId = 'garageId',
  UpdatedAt = 'updatedAt',
  Verified = 'verified',
}

export type VerificationWhereInput = {
  AND?: InputMaybe<Array<VerificationWhereInput>>
  NOT?: InputMaybe<Array<VerificationWhereInput>>
  OR?: InputMaybe<Array<VerificationWhereInput>>
  admin?: InputMaybe<AdminRelationFilter>
  adminId?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  garage?: InputMaybe<GarageRelationFilter>
  garageId?: InputMaybe<IntFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
  verified?: InputMaybe<BoolFilter>
}

export type VerificationWhereUniqueInput = {
  garageId?: InputMaybe<Scalars['Int']>
}

export type CreateManagerMutationVariables = Exact<{
  createManagerInput: CreateManagerInput
}>

export type CreateManagerMutation = {
  __typename?: 'Mutation'
  createManager: { __typename?: 'Manager'; uid: string }
}

export type CreateCustomerMutationVariables = Exact<{
  createCustomerInput: CreateCustomerInput
}>

export type CreateCustomerMutation = {
  __typename?: 'Mutation'
  createCustomer: { __typename?: 'Customer'; uid: string }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean }

export type GaragesQueryVariables = Exact<{
  orderBy?: InputMaybe<
    Array<GarageOrderByWithRelationInput> | GarageOrderByWithRelationInput
  >
  where?: InputMaybe<GarageWhereInput>
  cursor?: InputMaybe<GarageWhereUniqueInput>
  take?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
  distinct?: InputMaybe<Array<GarageScalarFieldEnum> | GarageScalarFieldEnum>
}>

export type GaragesQuery = {
  __typename?: 'Query'
  garages: Array<{
    __typename?: 'Garage'
    id: number
    displayName: string
    images?: Array<string> | null
    address: { __typename?: 'Address'; address: string }
  }>
  garagesCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export type SearchGaragesQueryVariables = Exact<{
  dateFilter: DateFilterInput
  locationFilter: LocationFilterInput
  garageFilter?: InputMaybe<GarageFilter>
  slotsFilter?: InputMaybe<SlotWhereInput>
}>

export type SearchGaragesQuery = {
  __typename?: 'Query'
  searchGarages: Array<{
    __typename?: 'Garage'
    id: number
    displayName: string
    address: {
      __typename?: 'Address'
      lat: number
      lng: number
      address: string
    }
    availableSlots: Array<{
      __typename?: 'MinimalSlotGroupBy'
      type?: SlotType | null
      count: number
      pricePerHour: number
    }>
  }>
}

export type CreateBookingMutationVariables = Exact<{
  createBookingInput: CreateBookingInput
}>

export type CreateBookingMutation = {
  __typename?: 'Mutation'
  createBooking: {
    __typename?: 'Booking'
    id: number
    passcode?: string | null
  }
}

export type LoginMutationVariables = Exact<{
  credentials: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: {
    __typename?: 'LoginOutput'
    refreshToken: string
    localId: string
    kind: string
    idToken: string
    expiresIn: string
    email: string
    displayName: string
  }
}

export type RegisterMutationVariables = Exact<{
  credentials: RegisterInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register: {
    __typename?: 'RegisterOutput'
    refreshToken: string
    localId: string
    kind: string
    idToken: string
    expiresIn: string
    email: string
    displayName: string
  }
}

export type GetManagerQueryVariables = Exact<{
  where: ManagerWhereUniqueInput
}>

export type GetManagerQuery = {
  __typename?: 'Query'
  manager: {
    __typename?: 'Manager'
    uid: string
    createdAt: any
    updatedAt: any
    displayName: string
  }
}

export type CreateCompanyMutationVariables = Exact<{
  createCompanyInput: CreateCompanyInput
}>

export type CreateCompanyMutation = {
  __typename?: 'Mutation'
  createCompany: { __typename?: 'Company'; id: number }
}

export type MyCompanyQueryVariables = Exact<{ [key: string]: never }>

export type MyCompanyQuery = {
  __typename?: 'Query'
  myCompany: {
    __typename?: 'Company'
    id: number
    createdAt: any
    displayName: string
    garages: Array<{
      __typename?: 'Garage'
      displayName: string
      id: number
      description?: string | null
      address: {
        __typename?: 'Address'
        id: number
        address: string
        lat: number
        lng: number
      }
    }>
  }
}

export type CreateGarageMutationVariables = Exact<{
  createGarageInput: CreateGarageInput
}>

export type CreateGarageMutation = {
  __typename?: 'Mutation'
  createGarage: { __typename?: 'Garage'; id: number }
}

export type AdminsQueryVariables = Exact<{
  distinct?: InputMaybe<Array<AdminScalarFieldEnum> | AdminScalarFieldEnum>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  cursor?: InputMaybe<AdminWhereUniqueInput>
  orderBy?: InputMaybe<
    Array<AdminOrderByWithRelationInput> | AdminOrderByWithRelationInput
  >
  where?: InputMaybe<AdminWhereInput>
}>

export type AdminsQuery = {
  __typename?: 'Query'
  admins: Array<{
    __typename?: 'Admin'
    uid: string
    updatedAt: any
    displayName?: string | null
    createdAt: any
  }>
  adminsCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export const CreateManagerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateManager' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createManagerInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateManagerInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createManager' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createManagerInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createManagerInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateManagerMutation,
  CreateManagerMutationVariables
>
export const CreateCustomerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateCustomer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createCustomerInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateCustomerInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCustomer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createCustomerInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createCustomerInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCustomerMutation,
  CreateCustomerMutationVariables
>
export const LogoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'logout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'logout' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>
export const GaragesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Garages' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'GarageOrderByWithRelationInput' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GarageWhereInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GarageWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'GarageScalarFieldEnum' },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'garages' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'garagesCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GaragesQuery, GaragesQueryVariables>
export const SearchGaragesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchGarages' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dateFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateFilterInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'locationFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LocationFilterInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'garageFilter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GarageFilter' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'slotsFilter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'SlotWhereInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'searchGarages' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dateFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dateFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'locationFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'locationFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'garageFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'garageFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slotsFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'slotsFilter' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'availableSlots' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'slotsFilter' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'slotsFilter' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'dateFilter' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'dateFilter' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pricePerHour' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchGaragesQuery, SearchGaragesQueryVariables>
export const CreateBookingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createBooking' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createBookingInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateBookingInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createBooking' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createBookingInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createBookingInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'passcode' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateBookingMutation,
  CreateBookingMutationVariables
>
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'credentials' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LoginInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'credentials' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'credentials' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refreshToken' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'localId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'kind' } },
                { kind: 'Field', name: { kind: 'Name', value: 'idToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expiresIn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>
export const RegisterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'register' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'credentials' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RegisterInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'register' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'credentials' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'credentials' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refreshToken' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'localId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'kind' } },
                { kind: 'Field', name: { kind: 'Name', value: 'idToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expiresIn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>
export const GetManagerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getManager' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ManagerWhereUniqueInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'manager' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetManagerQuery, GetManagerQueryVariables>
export const CreateCompanyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCompany' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createCompanyInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateCompanyInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCompany' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createCompanyInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createCompanyInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCompanyMutation,
  CreateCompanyMutationVariables
>
export const MyCompanyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'myCompany' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'myCompany' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'garages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'displayName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lat' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lng' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyCompanyQuery, MyCompanyQueryVariables>
export const CreateGarageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createGarage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createGarageInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateGarageInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createGarage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createGarageInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createGarageInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateGarageMutation,
  CreateGarageMutationVariables
>
export const AdminsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'admins' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'AdminScalarFieldEnum' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'AdminWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'AdminOrderByWithRelationInput' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'AdminWhereInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'admins' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminsCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminsQuery, AdminsQueryVariables>
