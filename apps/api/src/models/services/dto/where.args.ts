import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { BookingRelationFilter } from 'src/models/bookings/dto/where.args'
import { GarageRelationFilter } from 'src/models/garages/dto/where.args'

@InputType()
export class ServiceWhereUniqueInput
  implements
    RestrictProperties<ServiceWhereUniqueInput, Prisma.ServiceWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class ServiceWhereInput
  implements RestrictProperties<ServiceWhereInput, Prisma.ServiceWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  bookingId: IntFilter
  @Field(() => BookingRelationFilter, { nullable: true })
  Booking: BookingRelationFilter
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => StringFilter, { nullable: true })
  description: StringFilter
  @Field(() => IntFilter, { nullable: true })
  price: IntFilter
  @Field(() => IntFilter, { nullable: true })
  duration: IntFilter
  @Field(() => IntFilter, { nullable: true })
  garageId: IntFilter
  @Field(() => GarageRelationFilter, { nullable: true })
  Garage: GarageRelationFilter
  // @Field(() => StringFilter, { nullable: true })
  // uid: StringFilter

  @Field(() => [ServiceWhereInput], { nullable: true })
  AND: ServiceWhereInput[]
  @Field(() => [ServiceWhereInput], { nullable: true })
  OR: ServiceWhereInput[]
  @Field(() => [ServiceWhereInput], { nullable: true })
  NOT: ServiceWhereInput[]
}

@InputType()
export class ServiceListRelationFilter {
  @Field(() => ServiceWhereInput, { nullable: true })
  every: ServiceWhereInput
  @Field(() => ServiceWhereInput, { nullable: true })
  some: ServiceWhereInput
  @Field(() => ServiceWhereInput, { nullable: true })
  none: ServiceWhereInput
}

@InputType()
export class ServiceRelationFilter {
  @Field(() => ServiceWhereInput, { nullable: true })
  is: ServiceWhereInput
  @Field(() => ServiceWhereInput, { nullable: true })
  isNot: ServiceWhereInput
}
