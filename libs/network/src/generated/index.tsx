import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
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
const defaultOptions = {} as const
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
  displayName: Scalars['String']
  uid: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type AdminOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  displayName?: InputMaybe<SortOrder>
  role?: InputMaybe<SortOrder>
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
  BookingTimeline?: InputMaybe<BookingTimelineOrderByRelationAggregateInput>
  createdAt?: InputMaybe<SortOrder>
  customer?: InputMaybe<CustomerOrderByWithRelationInput>
  customerId?: InputMaybe<SortOrder>
  endTime?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  passcode?: InputMaybe<SortOrder>
  phoneNumber?: InputMaybe<SortOrder>
  pricePerHour?: InputMaybe<SortOrder>
  slot?: InputMaybe<SlotOrderByWithRelationInput>
  slotId?: InputMaybe<SortOrder>
  startTime?: InputMaybe<SortOrder>
  status?: InputMaybe<SortOrder>
  totalPrice?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
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
}

export type BookingTimeline = {
  __typename?: 'BookingTimeline'
  bookingId: Scalars['Int']
  id: Scalars['Int']
  managerId: Scalars['String']
  status: BookingStatus
  timestamp: Scalars['DateTime']
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
}

export enum BookingTimelineScalarFieldEnum {
  BookingId = 'bookingId',
  Id = 'id',
  ManagerId = 'managerId',
  Status = 'status',
  Timestamp = 'timestamp',
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
}

export type BookingTimelineWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type BookingWhereInput = {
  AND?: InputMaybe<Array<BookingWhereInput>>
  BookingTimeline?: InputMaybe<BookingTimelineListRelationFilter>
  NOT?: InputMaybe<Array<BookingWhereInput>>
  OR?: InputMaybe<Array<BookingWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  customer?: InputMaybe<CustomerRelationFilter>
  customerId?: InputMaybe<StringFilter>
  endTime?: InputMaybe<DateTimeFilter>
  id?: InputMaybe<IntFilter>
  passcode?: InputMaybe<StringFilter>
  phoneNumber?: InputMaybe<StringFilter>
  pricePerHour?: InputMaybe<FloatFilter>
  slot?: InputMaybe<SlotRelationFilter>
  slotId?: InputMaybe<IntFilter>
  startTime?: InputMaybe<DateTimeFilter>
  status?: InputMaybe<EnumBookingStatusFilter>
  totalPrice?: InputMaybe<FloatFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
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
  manager?: InputMaybe<ManagerOrderByWithRelationInput>
  updatedAt?: InputMaybe<SortOrder>
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
  manager?: InputMaybe<ManagerRelationFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
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

export type CreateAdminInput = {
  displayName: Scalars['String']
  uid: Scalars['String']
}

export type CreateBookingInput = {
  customerId: Scalars['String']
  endTime: Scalars['DateTime']
  garageId: Scalars['Int']
  phoneNumber?: InputMaybe<Scalars['String']>
  startTime: Scalars['DateTime']
  type: SlotType
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
  description: Scalars['String']
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
  description: Scalars['String']
  displayName: Scalars['String']
  id: Scalars['Int']
  images?: Maybe<Array<Scalars['String']>>
  slotCounts: Array<SlotTypeCount>
  slots: Array<Slot>
  updatedAt: Scalars['DateTime']
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
  createSlot: Slot
  createVerification: Verification
  login: LoginOutput
  logout: Scalars['Boolean']
  refreshToken: RefreshTokenOutput
  register: RegisterOutput
  removeAddress: Address
  removeAdmin: Admin
  removeBooking: Booking
  removeBookingTimeline: BookingTimeline
  removeCompany: Company
  removeCustomer: Customer
  removeGarage: Garage
  removeManager: Manager
  removeReview: Review
  removeSlot: Slot
  removeVerification: Verification
  setAdmin: Scalars['Boolean']
  setRole: Scalars['Boolean']
  updateAddress: Address
  updateAdmin: Admin
  updateBooking: Booking
  updateBookingTimeline: BookingTimeline
  updateCompany: Company
  updateCustomer: Customer
  updateGarage: Garage
  updateManager: Manager
  updateReview: Review
  updateSlot: Slot
  updateVerification: Verification
}

export type MutationCreateAddressArgs = {
  createAddressInput: CreateAddressInput
}

export type MutationCreateAdminArgs = {
  createAdminInput: CreateAdminInput
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

export type MutationRemoveBookingArgs = {
  where?: InputMaybe<BookingWhereUniqueInput>
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

export type MutationUpdateBookingArgs = {
  updateBookingInput: UpdateBookingInput
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

export type UpdateBookingInput = {
  customerId?: InputMaybe<Scalars['String']>
  endTime?: InputMaybe<Scalars['DateTime']>
  garageId?: InputMaybe<Scalars['Int']>
  id: Scalars['Int']
  phoneNumber?: InputMaybe<Scalars['String']>
  startTime?: InputMaybe<Scalars['DateTime']>
  type?: InputMaybe<SlotType>
  vehicleNumber?: InputMaybe<Scalars['String']>
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
    description: string
    images?: Array<string> | null
    address: { __typename?: 'Address'; address: string }
    slotCounts: Array<{
      __typename?: 'SlotTypeCount'
      type: SlotType
      count: number
    }>
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
    images?: Array<string> | null
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

export type BookingFieldsFragment = {
  __typename?: 'Booking'
  id: number
  pricePerHour?: number | null
  endTime: any
  startTime: any
  vehicleNumber: string
  passcode?: string | null
  status: BookingStatus
  slot: {
    __typename?: 'Slot'
    displayName?: string | null
    garage: {
      __typename?: 'Garage'
      images?: Array<string> | null
      address: {
        __typename?: 'Address'
        address: string
        lat: number
        lng: number
      }
    }
  }
}

export type BookingsQueryVariables = Exact<{
  distinct?: InputMaybe<Array<BookingScalarFieldEnum> | BookingScalarFieldEnum>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  cursor?: InputMaybe<BookingWhereUniqueInput>
  orderBy?: InputMaybe<
    Array<BookingOrderByWithRelationInput> | BookingOrderByWithRelationInput
  >
  where?: InputMaybe<BookingWhereInput>
}>

export type BookingsQuery = {
  __typename?: 'Query'
  bookings: Array<{
    __typename?: 'Booking'
    id: number
    pricePerHour?: number | null
    endTime: any
    startTime: any
    vehicleNumber: string
    passcode?: string | null
    status: BookingStatus
    slot: {
      __typename?: 'Slot'
      displayName?: string | null
      garage: {
        __typename?: 'Garage'
        images?: Array<string> | null
        address: {
          __typename?: 'Address'
          address: string
          lat: number
          lng: number
        }
      }
    }
  }>
  bookingsCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export type BookingsForGarageQueryVariables = Exact<{
  distinct?: InputMaybe<Array<BookingScalarFieldEnum> | BookingScalarFieldEnum>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  cursor?: InputMaybe<BookingWhereUniqueInput>
  orderBy?: InputMaybe<
    Array<BookingOrderByWithRelationInput> | BookingOrderByWithRelationInput
  >
  where?: InputMaybe<BookingWhereInput>
}>

export type BookingsForGarageQuery = {
  __typename?: 'Query'
  bookingsForGarage: Array<{
    __typename?: 'Booking'
    id: number
    pricePerHour?: number | null
    endTime: any
    startTime: any
    vehicleNumber: string
    passcode?: string | null
    status: BookingStatus
    slot: {
      __typename?: 'Slot'
      displayName?: string | null
      garage: {
        __typename?: 'Garage'
        images?: Array<string> | null
        address: {
          __typename?: 'Address'
          address: string
          lat: number
          lng: number
        }
      }
    }
  }>
  bookingsCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export type CreateBookingTimelineMutationVariables = Exact<{
  createBookingTimelineInput: CreateBookingTimelineInput
}>

export type CreateBookingTimelineMutation = {
  __typename?: 'Mutation'
  createBookingTimeline: {
    __typename?: 'BookingTimeline'
    bookingId: number
    id: number
    managerId: string
    status: BookingStatus
    timestamp: any
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

export type CreateManySlotsMutationVariables = Exact<{
  slots: Array<CreateSlotInput> | CreateSlotInput
}>

export type CreateManySlotsMutation = {
  __typename?: 'Mutation'
  createManySlots: { __typename?: 'ReturnCount'; count: number }
}

export type MyCompanyQueryVariables = Exact<{ [key: string]: never }>

export type MyCompanyQuery = {
  __typename?: 'Query'
  myCompany: {
    __typename?: 'Company'
    id: number
    createdAt: any
    displayName: string
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
    displayName: string
    createdAt: any
  }>
  adminsCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export const namedOperations = {
  Query: {
    Garages: 'Garages',
    SearchGarages: 'SearchGarages',
    bookings: 'bookings',
    bookingsForGarage: 'bookingsForGarage',
    getManager: 'getManager',
    myCompany: 'myCompany',
    admins: 'admins',
  },
  Mutation: {
    CreateManager: 'CreateManager',
    CreateCustomer: 'CreateCustomer',
    logout: 'logout',
    createBooking: 'createBooking',
    createBookingTimeline: 'createBookingTimeline',
    Login: 'Login',
    register: 'register',
    createCompany: 'createCompany',
    createManySlots: 'createManySlots',
    createGarage: 'createGarage',
  },
  Fragment: {
    BookingFields: 'BookingFields',
  },
}
export const BookingFieldsFragmentDoc = /*#__PURE__*/ gql`
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
export const CreateManagerDocument = /*#__PURE__*/ gql`
  mutation CreateManager($createManagerInput: CreateManagerInput!) {
    createManager(createManagerInput: $createManagerInput) {
      uid
    }
  }
`
export type CreateManagerMutationFn = Apollo.MutationFunction<
  CreateManagerMutation,
  CreateManagerMutationVariables
>

/**
 * __useCreateManagerMutation__
 *
 * To run a mutation, you first call `useCreateManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createManagerMutation, { data, loading, error }] = useCreateManagerMutation({
 *   variables: {
 *      createManagerInput: // value for 'createManagerInput'
 *   },
 * });
 */
export function useCreateManagerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateManagerMutation,
    CreateManagerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateManagerMutation,
    CreateManagerMutationVariables
  >(CreateManagerDocument, options)
}
export type CreateManagerMutationHookResult = ReturnType<
  typeof useCreateManagerMutation
>
export type CreateManagerMutationResult =
  Apollo.MutationResult<CreateManagerMutation>
export type CreateManagerMutationOptions = Apollo.BaseMutationOptions<
  CreateManagerMutation,
  CreateManagerMutationVariables
>
export const CreateCustomerDocument = /*#__PURE__*/ gql`
  mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      uid
    }
  }
`
export type CreateCustomerMutationFn = Apollo.MutationFunction<
  CreateCustomerMutation,
  CreateCustomerMutationVariables
>

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      createCustomerInput: // value for 'createCustomerInput'
 *   },
 * });
 */
export function useCreateCustomerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCustomerMutation,
    CreateCustomerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateCustomerMutation,
    CreateCustomerMutationVariables
  >(CreateCustomerDocument, options)
}
export type CreateCustomerMutationHookResult = ReturnType<
  typeof useCreateCustomerMutation
>
export type CreateCustomerMutationResult =
  Apollo.MutationResult<CreateCustomerMutation>
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<
  CreateCustomerMutation,
  CreateCustomerMutationVariables
>
export const LogoutDocument = /*#__PURE__*/ gql`
  mutation logout {
    logout
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options,
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const GaragesDocument = /*#__PURE__*/ gql`
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

/**
 * __useGaragesQuery__
 *
 * To run a query within a React component, call `useGaragesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGaragesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGaragesQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useGaragesQuery(
  baseOptions?: Apollo.QueryHookOptions<GaragesQuery, GaragesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GaragesQuery, GaragesQueryVariables>(
    GaragesDocument,
    options,
  )
}
export function useGaragesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GaragesQuery,
    GaragesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GaragesQuery, GaragesQueryVariables>(
    GaragesDocument,
    options,
  )
}
export type GaragesQueryHookResult = ReturnType<typeof useGaragesQuery>
export type GaragesLazyQueryHookResult = ReturnType<typeof useGaragesLazyQuery>
export type GaragesQueryResult = Apollo.QueryResult<
  GaragesQuery,
  GaragesQueryVariables
>
export const SearchGaragesDocument = /*#__PURE__*/ gql`
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

/**
 * __useSearchGaragesQuery__
 *
 * To run a query within a React component, call `useSearchGaragesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchGaragesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchGaragesQuery({
 *   variables: {
 *      dateFilter: // value for 'dateFilter'
 *      locationFilter: // value for 'locationFilter'
 *      garageFilter: // value for 'garageFilter'
 *      slotsFilter: // value for 'slotsFilter'
 *   },
 * });
 */
export function useSearchGaragesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchGaragesQuery,
    SearchGaragesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchGaragesQuery, SearchGaragesQueryVariables>(
    SearchGaragesDocument,
    options,
  )
}
export function useSearchGaragesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchGaragesQuery,
    SearchGaragesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchGaragesQuery, SearchGaragesQueryVariables>(
    SearchGaragesDocument,
    options,
  )
}
export type SearchGaragesQueryHookResult = ReturnType<
  typeof useSearchGaragesQuery
>
export type SearchGaragesLazyQueryHookResult = ReturnType<
  typeof useSearchGaragesLazyQuery
>
export type SearchGaragesQueryResult = Apollo.QueryResult<
  SearchGaragesQuery,
  SearchGaragesQueryVariables
>
export const CreateBookingDocument = /*#__PURE__*/ gql`
  mutation createBooking($createBookingInput: CreateBookingInput!) {
    createBooking(createBookingInput: $createBookingInput) {
      id
      passcode
    }
  }
`
export type CreateBookingMutationFn = Apollo.MutationFunction<
  CreateBookingMutation,
  CreateBookingMutationVariables
>

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      createBookingInput: // value for 'createBookingInput'
 *   },
 * });
 */
export function useCreateBookingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBookingMutation,
    CreateBookingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateBookingMutation,
    CreateBookingMutationVariables
  >(CreateBookingDocument, options)
}
export type CreateBookingMutationHookResult = ReturnType<
  typeof useCreateBookingMutation
>
export type CreateBookingMutationResult =
  Apollo.MutationResult<CreateBookingMutation>
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<
  CreateBookingMutation,
  CreateBookingMutationVariables
>
export const BookingsDocument = /*#__PURE__*/ gql`
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
  ${BookingFieldsFragmentDoc}
`

/**
 * __useBookingsQuery__
 *
 * To run a query within a React component, call `useBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingsQuery({
 *   variables: {
 *      distinct: // value for 'distinct'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBookingsQuery(
  baseOptions?: Apollo.QueryHookOptions<BookingsQuery, BookingsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<BookingsQuery, BookingsQueryVariables>(
    BookingsDocument,
    options,
  )
}
export function useBookingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BookingsQuery,
    BookingsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<BookingsQuery, BookingsQueryVariables>(
    BookingsDocument,
    options,
  )
}
export type BookingsQueryHookResult = ReturnType<typeof useBookingsQuery>
export type BookingsLazyQueryHookResult = ReturnType<
  typeof useBookingsLazyQuery
>
export type BookingsQueryResult = Apollo.QueryResult<
  BookingsQuery,
  BookingsQueryVariables
>
export const BookingsForGarageDocument = /*#__PURE__*/ gql`
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
  ${BookingFieldsFragmentDoc}
`

/**
 * __useBookingsForGarageQuery__
 *
 * To run a query within a React component, call `useBookingsForGarageQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingsForGarageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingsForGarageQuery({
 *   variables: {
 *      distinct: // value for 'distinct'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBookingsForGarageQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BookingsForGarageQuery,
    BookingsForGarageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    BookingsForGarageQuery,
    BookingsForGarageQueryVariables
  >(BookingsForGarageDocument, options)
}
export function useBookingsForGarageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BookingsForGarageQuery,
    BookingsForGarageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    BookingsForGarageQuery,
    BookingsForGarageQueryVariables
  >(BookingsForGarageDocument, options)
}
export type BookingsForGarageQueryHookResult = ReturnType<
  typeof useBookingsForGarageQuery
>
export type BookingsForGarageLazyQueryHookResult = ReturnType<
  typeof useBookingsForGarageLazyQuery
>
export type BookingsForGarageQueryResult = Apollo.QueryResult<
  BookingsForGarageQuery,
  BookingsForGarageQueryVariables
>
export const CreateBookingTimelineDocument = /*#__PURE__*/ gql`
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
export type CreateBookingTimelineMutationFn = Apollo.MutationFunction<
  CreateBookingTimelineMutation,
  CreateBookingTimelineMutationVariables
>

/**
 * __useCreateBookingTimelineMutation__
 *
 * To run a mutation, you first call `useCreateBookingTimelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingTimelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingTimelineMutation, { data, loading, error }] = useCreateBookingTimelineMutation({
 *   variables: {
 *      createBookingTimelineInput: // value for 'createBookingTimelineInput'
 *   },
 * });
 */
export function useCreateBookingTimelineMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBookingTimelineMutation,
    CreateBookingTimelineMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateBookingTimelineMutation,
    CreateBookingTimelineMutationVariables
  >(CreateBookingTimelineDocument, options)
}
export type CreateBookingTimelineMutationHookResult = ReturnType<
  typeof useCreateBookingTimelineMutation
>
export type CreateBookingTimelineMutationResult =
  Apollo.MutationResult<CreateBookingTimelineMutation>
export type CreateBookingTimelineMutationOptions = Apollo.BaseMutationOptions<
  CreateBookingTimelineMutation,
  CreateBookingTimelineMutationVariables
>
export const LoginDocument = /*#__PURE__*/ gql`
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
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const RegisterDocument = /*#__PURE__*/ gql`
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
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  )
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const GetManagerDocument = /*#__PURE__*/ gql`
  query getManager($where: ManagerWhereUniqueInput!) {
    manager(where: $where) {
      uid
      createdAt
      updatedAt
      displayName
    }
  }
`

/**
 * __useGetManagerQuery__
 *
 * To run a query within a React component, call `useGetManagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManagerQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetManagerQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetManagerQuery,
    GetManagerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetManagerQuery, GetManagerQueryVariables>(
    GetManagerDocument,
    options,
  )
}
export function useGetManagerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetManagerQuery,
    GetManagerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetManagerQuery, GetManagerQueryVariables>(
    GetManagerDocument,
    options,
  )
}
export type GetManagerQueryHookResult = ReturnType<typeof useGetManagerQuery>
export type GetManagerLazyQueryHookResult = ReturnType<
  typeof useGetManagerLazyQuery
>
export type GetManagerQueryResult = Apollo.QueryResult<
  GetManagerQuery,
  GetManagerQueryVariables
>
export const CreateCompanyDocument = /*#__PURE__*/ gql`
  mutation createCompany($createCompanyInput: CreateCompanyInput!) {
    createCompany(createCompanyInput: $createCompanyInput) {
      id
    }
  }
`
export type CreateCompanyMutationFn = Apollo.MutationFunction<
  CreateCompanyMutation,
  CreateCompanyMutationVariables
>

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      createCompanyInput: // value for 'createCompanyInput'
 *   },
 * });
 */
export function useCreateCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCompanyMutation,
    CreateCompanyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateCompanyMutation,
    CreateCompanyMutationVariables
  >(CreateCompanyDocument, options)
}
export type CreateCompanyMutationHookResult = ReturnType<
  typeof useCreateCompanyMutation
>
export type CreateCompanyMutationResult =
  Apollo.MutationResult<CreateCompanyMutation>
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<
  CreateCompanyMutation,
  CreateCompanyMutationVariables
>
export const CreateManySlotsDocument = /*#__PURE__*/ gql`
  mutation createManySlots($slots: [CreateSlotInput!]!) {
    createManySlots(slots: $slots) {
      count
    }
  }
`
export type CreateManySlotsMutationFn = Apollo.MutationFunction<
  CreateManySlotsMutation,
  CreateManySlotsMutationVariables
>

/**
 * __useCreateManySlotsMutation__
 *
 * To run a mutation, you first call `useCreateManySlotsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateManySlotsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createManySlotsMutation, { data, loading, error }] = useCreateManySlotsMutation({
 *   variables: {
 *      slots: // value for 'slots'
 *   },
 * });
 */
export function useCreateManySlotsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateManySlotsMutation,
    CreateManySlotsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateManySlotsMutation,
    CreateManySlotsMutationVariables
  >(CreateManySlotsDocument, options)
}
export type CreateManySlotsMutationHookResult = ReturnType<
  typeof useCreateManySlotsMutation
>
export type CreateManySlotsMutationResult =
  Apollo.MutationResult<CreateManySlotsMutation>
export type CreateManySlotsMutationOptions = Apollo.BaseMutationOptions<
  CreateManySlotsMutation,
  CreateManySlotsMutationVariables
>
export const MyCompanyDocument = /*#__PURE__*/ gql`
  query myCompany {
    myCompany {
      id
      createdAt
      displayName
    }
  }
`

/**
 * __useMyCompanyQuery__
 *
 * To run a query within a React component, call `useMyCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCompanyQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCompanyQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyCompanyQuery,
    MyCompanyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MyCompanyQuery, MyCompanyQueryVariables>(
    MyCompanyDocument,
    options,
  )
}
export function useMyCompanyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyCompanyQuery,
    MyCompanyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MyCompanyQuery, MyCompanyQueryVariables>(
    MyCompanyDocument,
    options,
  )
}
export type MyCompanyQueryHookResult = ReturnType<typeof useMyCompanyQuery>
export type MyCompanyLazyQueryHookResult = ReturnType<
  typeof useMyCompanyLazyQuery
>
export type MyCompanyQueryResult = Apollo.QueryResult<
  MyCompanyQuery,
  MyCompanyQueryVariables
>
export const CreateGarageDocument = /*#__PURE__*/ gql`
  mutation createGarage($createGarageInput: CreateGarageInput!) {
    createGarage(createGarageInput: $createGarageInput) {
      id
    }
  }
`
export type CreateGarageMutationFn = Apollo.MutationFunction<
  CreateGarageMutation,
  CreateGarageMutationVariables
>

/**
 * __useCreateGarageMutation__
 *
 * To run a mutation, you first call `useCreateGarageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGarageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGarageMutation, { data, loading, error }] = useCreateGarageMutation({
 *   variables: {
 *      createGarageInput: // value for 'createGarageInput'
 *   },
 * });
 */
export function useCreateGarageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGarageMutation,
    CreateGarageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateGarageMutation,
    CreateGarageMutationVariables
  >(CreateGarageDocument, options)
}
export type CreateGarageMutationHookResult = ReturnType<
  typeof useCreateGarageMutation
>
export type CreateGarageMutationResult =
  Apollo.MutationResult<CreateGarageMutation>
export type CreateGarageMutationOptions = Apollo.BaseMutationOptions<
  CreateGarageMutation,
  CreateGarageMutationVariables
>
export const AdminsDocument = /*#__PURE__*/ gql`
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

/**
 * __useAdminsQuery__
 *
 * To run a query within a React component, call `useAdminsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminsQuery({
 *   variables: {
 *      distinct: // value for 'distinct'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAdminsQuery(
  baseOptions?: Apollo.QueryHookOptions<AdminsQuery, AdminsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AdminsQuery, AdminsQueryVariables>(
    AdminsDocument,
    options,
  )
}
export function useAdminsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AdminsQuery, AdminsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AdminsQuery, AdminsQueryVariables>(
    AdminsDocument,
    options,
  )
}
export type AdminsQueryHookResult = ReturnType<typeof useAdminsQuery>
export type AdminsLazyQueryHookResult = ReturnType<typeof useAdminsLazyQuery>
export type AdminsQueryResult = Apollo.QueryResult<
  AdminsQuery,
  AdminsQueryVariables
>
