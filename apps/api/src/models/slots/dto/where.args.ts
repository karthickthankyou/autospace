import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { Prisma, SlotType } from '@prisma/client'
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { BookingListRelationFilter } from 'src/models/bookings/dto/where.args'
import { GarageRelationFilter } from 'src/models/garages/dto/where.args'

registerEnumType(SlotType, {
  name: 'SlotType',
})

@InputType()
export class SlotWhereUniqueInput
  implements Required<Prisma.SlotWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class EnumSlotTypeFilter {
  @Field(() => SlotType, { nullable: true })
  equals?: SlotType;
  @Field(() => [SlotType], { nullable: true })
  in?: SlotType[]
  @Field(() => [SlotType], { nullable: true })
  notIn?: SlotType[]
  @Field(() => SlotType, { nullable: true })
  not?: SlotType
}

@InputType()
export class SlotWhereInput implements Required<Prisma.SlotWhereInput> {
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  displayName: StringFilter
  @Field(() => FloatFilter, { nullable: true })
  pricePerHour: FloatFilter
  @Field(() => EnumSlotTypeFilter, { nullable: true })
  type: EnumSlotTypeFilter
  @Field(() => IntFilter, { nullable: true })
  length: IntFilter
  @Field(() => IntFilter, { nullable: true })
  width: IntFilter
  @Field(() => IntFilter, { nullable: true })
  height: IntFilter
  @Field(() => IntFilter, { nullable: true })
  garageId: IntFilter
  @Field(() => GarageRelationFilter, { nullable: true })
  garage: Prisma.GarageRelationFilter

  @Field(() => BookingListRelationFilter, { nullable: true })
  bookings: Prisma.BookingListRelationFilter

  @Field(() => [SlotWhereInput], { nullable: true })
  AND: SlotWhereInput[]
  @Field(() => [SlotWhereInput], { nullable: true })
  OR: SlotWhereInput[]
  @Field(() => [SlotWhereInput], { nullable: true })
  NOT: SlotWhereInput[]
}

@InputType()
export class SlotListRelationFilter {
  @Field(() => SlotWhereInput)
  every?: SlotWhereInput
  @Field(() => SlotWhereInput)
  some?: SlotWhereInput
  @Field(() => SlotWhereInput)
  none?: SlotWhereInput
}

@InputType()
export class SlotRelationFilter {
  @Field(() => SlotWhereInput)
  is?: SlotWhereInput
  @Field(() => SlotWhereInput)
  isNot?: SlotWhereInput
}
