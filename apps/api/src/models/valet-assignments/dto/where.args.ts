import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { BookingRelationFilter } from 'src/models/bookings/dto/where.args'
import { ValetRelationFilter } from 'src/models/valets/dto/where.args'

@InputType()
export class ValetAssignmentWhereUniqueInput
  implements
    RestrictProperties<
      ValetAssignmentWhereUniqueInput,
      Prisma.ValetAssignmentWhereUniqueInput
    >
{
  @Field(() => Number, { nullable: true })
  bookingId: number
}

@InputType()
export class ValetAssignmentWhereInput
  implements
    RestrictProperties<
      ValetAssignmentWhereInput,
      Prisma.ValetAssignmentWhereInput
    >
{
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  pickupValetId: StringFilter
  @Field(() => StringFilter, { nullable: true })
  returnValetId: StringFilter
  @Field(() => FloatFilter, { nullable: true })
  pickupLat: FloatFilter
  @Field(() => FloatFilter, { nullable: true })
  pickupLng: FloatFilter
  @Field(() => FloatFilter, { nullable: true })
  returnLat: FloatFilter
  @Field(() => FloatFilter, { nullable: true })
  returnLng: FloatFilter
  @Field(() => IntFilter, { nullable: true })
  bookingId: IntFilter
  @Field(() => ValetRelationFilter, { nullable: true })
  pickupValet: ValetRelationFilter
  @Field(() => ValetRelationFilter, { nullable: true })
  returnValet: ValetRelationFilter
  @Field(() => BookingRelationFilter, { nullable: true })
  booking: BookingRelationFilter

  // @Field(() => StringFilter, { nullable: true })
  // uid: StringFilter

  @Field(() => [ValetAssignmentWhereInput], { nullable: true })
  AND: ValetAssignmentWhereInput[]
  @Field(() => [ValetAssignmentWhereInput], { nullable: true })
  OR: ValetAssignmentWhereInput[]
  @Field(() => [ValetAssignmentWhereInput], { nullable: true })
  NOT: ValetAssignmentWhereInput[]
}

@InputType()
export class ValetAssignmentListRelationFilter {
  @Field(() => ValetAssignmentWhereInput, { nullable: true })
  every: ValetAssignmentWhereInput
  @Field(() => ValetAssignmentWhereInput, { nullable: true })
  some: ValetAssignmentWhereInput
  @Field(() => ValetAssignmentWhereInput, { nullable: true })
  none: ValetAssignmentWhereInput
}

@InputType()
export class ValetAssignmentRelationFilter {
  @Field(() => ValetAssignmentWhereInput, { nullable: true })
  is: ValetAssignmentWhereInput
  @Field(() => ValetAssignmentWhereInput, { nullable: true })
  isNot: ValetAssignmentWhereInput
}
