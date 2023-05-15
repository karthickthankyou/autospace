import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  StringFilter,
} from 'src/common/dtos/common.input'
import { GarageRelationFilter } from 'src/models/garages/dto/where.args'

@InputType()
export class AddressWhereUniqueInput
  implements Required<Prisma.AddressWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  garageId: number
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class AddressWhereInput implements Required<Prisma.AddressWhereInput> {
  @Field(() => StringFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => IntFilter, { nullable: true })
  garageId: IntFilter
  @Field(() => StringFilter, { nullable: true })
  address: StringFilter
  @Field(() => FloatFilter, { nullable: true })
  lat: FloatFilter
  @Field(() => FloatFilter, { nullable: true })
  lng: FloatFilter

  @Field(() => GarageRelationFilter, { nullable: true })
  garage: Prisma.GarageRelationFilter

  @Field(() => [AddressWhereInput], { nullable: true })
  AND: AddressWhereInput[]
  @Field(() => [AddressWhereInput], { nullable: true })
  OR: AddressWhereInput[]
  @Field(() => [AddressWhereInput], { nullable: true })
  NOT: AddressWhereInput[]
}

@InputType()
//   implements Required<Prisma.AddressListRelationFilter>
export class AddressListRelationFilter {
  @Field(() => AddressWhereInput, { nullable: true })
  every: Prisma.AddressWhereInput
  @Field(() => AddressWhereInput, { nullable: true })
  some: Prisma.AddressWhereInput
  @Field(() => AddressWhereInput, { nullable: true })
  none: Prisma.AddressWhereInput
}

@InputType()
export class AddressRelationFilter
  implements Required<Prisma.AddressRelationFilter>
{
  @Field(() => AddressWhereInput, { nullable: true })
  is: Prisma.AddressWhereInput
  @Field(() => AddressWhereInput, { nullable: true })
  isNot: Prisma.AddressWhereInput
}
