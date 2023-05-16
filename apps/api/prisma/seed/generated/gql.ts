/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation CreateManager($createManagerInput: CreateManagerInput!) {\n    createManager(createManagerInput: $createManagerInput) {\n      uid\n    }\n  }\n':
    types.CreateManagerDocument,
  '\n  mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {\n    createCustomer(createCustomerInput: $createCustomerInput) {\n      uid\n    }\n  }\n':
    types.CreateCustomerDocument,
  '\n  mutation logout {\n    logout\n  }\n': types.LogoutDocument,
  '\n  query Garages(\n    $orderBy: [GarageOrderByWithRelationInput!]\n    $where: GarageWhereInput\n    $cursor: GarageWhereUniqueInput\n    $take: Int\n    $skip: Int\n    $distinct: [GarageScalarFieldEnum!]\n  ) {\n    garages(\n      orderBy: $orderBy\n      where: $where\n      cursor: $cursor\n      take: $take\n      skip: $skip\n      distinct: $distinct\n    ) {\n      id\n      displayName\n      imageUrl\n      address {\n        address\n      }\n    }\n    garagesCount(where: $where) {\n      count\n    }\n  }\n':
    types.GaragesDocument,
  '\n  query SearchGarages(\n    $dateFilter: DateFilterInput!\n    $locationFilter: LocationFilterInput!\n    $garageFilter: GarageFilter\n    $slotsFilter: SlotWhereInput\n  ) {\n    searchGarages(\n      dateFilter: $dateFilter\n      locationFilter: $locationFilter\n      garageFilter: $garageFilter\n      slotsFilter: $slotsFilter\n    ) {\n      id\n      address {\n        lat\n        lng\n        address\n      }\n      displayName\n      availableSlots(slotsFilter: $slotsFilter, dateFilter: $dateFilter) {\n        type\n        count\n        pricePerHour\n      }\n    }\n  }\n':
    types.SearchGaragesDocument,
  '\n  mutation createBooking($createBookingInput: CreateBookingInput!) {\n    createBooking(createBookingInput: $createBookingInput) {\n      id\n      passcode\n    }\n  }\n':
    types.CreateBookingDocument,
  '\n  mutation Login($credentials: LoginInput!) {\n    login(credentials: $credentials) {\n      refreshToken\n      localId\n      kind\n      idToken\n      expiresIn\n      email\n      displayName\n    }\n  }\n':
    types.LoginDocument,
  '\n  mutation register($credentials: RegisterInput!) {\n    register(credentials: $credentials) {\n      refreshToken\n      localId\n      kind\n      idToken\n      expiresIn\n      email\n      displayName\n    }\n  }\n':
    types.RegisterDocument,
  '\n  query getManager($where: ManagerWhereUniqueInput!) {\n    manager(where: $where) {\n      uid\n      createdAt\n      updatedAt\n      displayName\n    }\n  }\n':
    types.GetManagerDocument,
  '\n  mutation createCompany($createCompanyInput: CreateCompanyInput!) {\n    createCompany(createCompanyInput: $createCompanyInput) {\n      id\n    }\n  }\n':
    types.CreateCompanyDocument,
  '\n  mutation createManySlots($slots: [CreateSlotInput!]!) {\n    createManySlots(slots: $slots) {\n      count\n    }\n  }\n':
    types.CreateManySlotsDocument,
  '\n  query myCompany {\n    myCompany {\n      id\n      garages {\n        displayName\n        id\n        description\n        address {\n          id\n          address\n          lat\n          lng\n        }\n      }\n      createdAt\n      displayName\n    }\n  }\n':
    types.MyCompanyDocument,
  '\n  mutation createGarage($createGarageInput: CreateGarageInput!) {\n    createGarage(createGarageInput: $createGarageInput) {\n      id\n    }\n  }\n':
    types.CreateGarageDocument,
  '\n  query admins(\n    $distinct: [AdminScalarFieldEnum!]\n    $skip: Int\n    $take: Int\n    $cursor: AdminWhereUniqueInput\n    $orderBy: [AdminOrderByWithRelationInput!]\n    $where: AdminWhereInput\n  ) {\n    admins(\n      distinct: $distinct\n      skip: $skip\n      take: $take\n      cursor: $cursor\n      orderBy: $orderBy\n      where: $where\n    ) {\n      uid\n      updatedAt\n      displayName\n      createdAt\n    }\n    adminsCount(where: $where) {\n      count\n    }\n  }\n':
    types.AdminsDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateManager($createManagerInput: CreateManagerInput!) {\n    createManager(createManagerInput: $createManagerInput) {\n      uid\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateManager($createManagerInput: CreateManagerInput!) {\n    createManager(createManagerInput: $createManagerInput) {\n      uid\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {\n    createCustomer(createCustomerInput: $createCustomerInput) {\n      uid\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {\n    createCustomer(createCustomerInput: $createCustomerInput) {\n      uid\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation logout {\n    logout\n  }\n',
): (typeof documents)['\n  mutation logout {\n    logout\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Garages(\n    $orderBy: [GarageOrderByWithRelationInput!]\n    $where: GarageWhereInput\n    $cursor: GarageWhereUniqueInput\n    $take: Int\n    $skip: Int\n    $distinct: [GarageScalarFieldEnum!]\n  ) {\n    garages(\n      orderBy: $orderBy\n      where: $where\n      cursor: $cursor\n      take: $take\n      skip: $skip\n      distinct: $distinct\n    ) {\n      id\n      displayName\n      imageUrl\n      address {\n        address\n      }\n    }\n    garagesCount(where: $where) {\n      count\n    }\n  }\n',
): (typeof documents)['\n  query Garages(\n    $orderBy: [GarageOrderByWithRelationInput!]\n    $where: GarageWhereInput\n    $cursor: GarageWhereUniqueInput\n    $take: Int\n    $skip: Int\n    $distinct: [GarageScalarFieldEnum!]\n  ) {\n    garages(\n      orderBy: $orderBy\n      where: $where\n      cursor: $cursor\n      take: $take\n      skip: $skip\n      distinct: $distinct\n    ) {\n      id\n      displayName\n      imageUrl\n      address {\n        address\n      }\n    }\n    garagesCount(where: $where) {\n      count\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query SearchGarages(\n    $dateFilter: DateFilterInput!\n    $locationFilter: LocationFilterInput!\n    $garageFilter: GarageFilter\n    $slotsFilter: SlotWhereInput\n  ) {\n    searchGarages(\n      dateFilter: $dateFilter\n      locationFilter: $locationFilter\n      garageFilter: $garageFilter\n      slotsFilter: $slotsFilter\n    ) {\n      id\n      address {\n        lat\n        lng\n        address\n      }\n      displayName\n      availableSlots(slotsFilter: $slotsFilter, dateFilter: $dateFilter) {\n        type\n        count\n        pricePerHour\n      }\n    }\n  }\n',
): (typeof documents)['\n  query SearchGarages(\n    $dateFilter: DateFilterInput!\n    $locationFilter: LocationFilterInput!\n    $garageFilter: GarageFilter\n    $slotsFilter: SlotWhereInput\n  ) {\n    searchGarages(\n      dateFilter: $dateFilter\n      locationFilter: $locationFilter\n      garageFilter: $garageFilter\n      slotsFilter: $slotsFilter\n    ) {\n      id\n      address {\n        lat\n        lng\n        address\n      }\n      displayName\n      availableSlots(slotsFilter: $slotsFilter, dateFilter: $dateFilter) {\n        type\n        count\n        pricePerHour\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation createBooking($createBookingInput: CreateBookingInput!) {\n    createBooking(createBookingInput: $createBookingInput) {\n      id\n      passcode\n    }\n  }\n',
): (typeof documents)['\n  mutation createBooking($createBookingInput: CreateBookingInput!) {\n    createBooking(createBookingInput: $createBookingInput) {\n      id\n      passcode\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Login($credentials: LoginInput!) {\n    login(credentials: $credentials) {\n      refreshToken\n      localId\n      kind\n      idToken\n      expiresIn\n      email\n      displayName\n    }\n  }\n',
): (typeof documents)['\n  mutation Login($credentials: LoginInput!) {\n    login(credentials: $credentials) {\n      refreshToken\n      localId\n      kind\n      idToken\n      expiresIn\n      email\n      displayName\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation register($credentials: RegisterInput!) {\n    register(credentials: $credentials) {\n      refreshToken\n      localId\n      kind\n      idToken\n      expiresIn\n      email\n      displayName\n    }\n  }\n',
): (typeof documents)['\n  mutation register($credentials: RegisterInput!) {\n    register(credentials: $credentials) {\n      refreshToken\n      localId\n      kind\n      idToken\n      expiresIn\n      email\n      displayName\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getManager($where: ManagerWhereUniqueInput!) {\n    manager(where: $where) {\n      uid\n      createdAt\n      updatedAt\n      displayName\n    }\n  }\n',
): (typeof documents)['\n  query getManager($where: ManagerWhereUniqueInput!) {\n    manager(where: $where) {\n      uid\n      createdAt\n      updatedAt\n      displayName\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation createCompany($createCompanyInput: CreateCompanyInput!) {\n    createCompany(createCompanyInput: $createCompanyInput) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation createCompany($createCompanyInput: CreateCompanyInput!) {\n    createCompany(createCompanyInput: $createCompanyInput) {\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation createManySlots($slots: [CreateSlotInput!]!) {\n    createManySlots(slots: $slots) {\n      count\n    }\n  }\n',
): (typeof documents)['\n  mutation createManySlots($slots: [CreateSlotInput!]!) {\n    createManySlots(slots: $slots) {\n      count\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query myCompany {\n    myCompany {\n      id\n      garages {\n        displayName\n        id\n        description\n        address {\n          id\n          address\n          lat\n          lng\n        }\n      }\n      createdAt\n      displayName\n    }\n  }\n',
): (typeof documents)['\n  query myCompany {\n    myCompany {\n      id\n      garages {\n        displayName\n        id\n        description\n        address {\n          id\n          address\n          lat\n          lng\n        }\n      }\n      createdAt\n      displayName\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation createGarage($createGarageInput: CreateGarageInput!) {\n    createGarage(createGarageInput: $createGarageInput) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation createGarage($createGarageInput: CreateGarageInput!) {\n    createGarage(createGarageInput: $createGarageInput) {\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query admins(\n    $distinct: [AdminScalarFieldEnum!]\n    $skip: Int\n    $take: Int\n    $cursor: AdminWhereUniqueInput\n    $orderBy: [AdminOrderByWithRelationInput!]\n    $where: AdminWhereInput\n  ) {\n    admins(\n      distinct: $distinct\n      skip: $skip\n      take: $take\n      cursor: $cursor\n      orderBy: $orderBy\n      where: $where\n    ) {\n      uid\n      updatedAt\n      displayName\n      createdAt\n    }\n    adminsCount(where: $where) {\n      count\n    }\n  }\n',
): (typeof documents)['\n  query admins(\n    $distinct: [AdminScalarFieldEnum!]\n    $skip: Int\n    $take: Int\n    $cursor: AdminWhereUniqueInput\n    $orderBy: [AdminOrderByWithRelationInput!]\n    $where: AdminWhereInput\n  ) {\n    admins(\n      distinct: $distinct\n      skip: $skip\n      take: $take\n      cursor: $cursor\n      orderBy: $orderBy\n      where: $where\n    ) {\n      uid\n      updatedAt\n      displayName\n      createdAt\n    }\n    adminsCount(where: $where) {\n      count\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
