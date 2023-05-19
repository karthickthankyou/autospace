import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { CustomerRelationFilter } from 'src/models/customers/dto/where.args'
import { GarageRelationFilter } from 'src/models/garages/dto/where.args'

@InputType()
export class ReviewWhereUniqueInput
  implements
    RestrictProperties<ReviewWhereUniqueInput, Prisma.ReviewWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class ReviewWhereInput
  implements RestrictProperties<ReviewWhereInput, Prisma.ReviewWhereInput>
{
  @Field(() => CustomerRelationFilter, { nullable: true })
  customer: Prisma.CustomerRelationFilter
  @Field(() => GarageRelationFilter, { nullable: true })
  garage: Prisma.GarageRelationFilter
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => IntFilter, { nullable: true })
  garageId: IntFilter
  @Field(() => StringFilter, { nullable: true })
  customerId: StringFilter
  @Field(() => IntFilter, { nullable: true })
  rating: IntFilter
  @Field(() => StringFilter, { nullable: true })
  comment: StringFilter
  //   @Field(() => GarageRelationFilter, { nullable: true })
  //   garage: GarageRelationFilter
  //   @Field(() => CustomerRelationFilter, { nullable: true })
  //   customer: CustomerRelationFilter
  // @Field(() => StringFilter, { nullable: true })
  // uid: StringFilter

  @Field(() => [ReviewWhereInput], { nullable: true })
  AND: ReviewWhereInput[]
  @Field(() => [ReviewWhereInput], { nullable: true })
  OR: ReviewWhereInput[]
  @Field(() => [ReviewWhereInput], { nullable: true })
  NOT: ReviewWhereInput[]
}

@InputType()
export class ReviewListRelationFilter
  implements
    RestrictProperties<
      ReviewListRelationFilter,
      Prisma.ReviewListRelationFilter
    >
{
  @Field(() => ReviewWhereInput)
  every: Prisma.ReviewWhereInput
  @Field(() => ReviewWhereInput)
  some: Prisma.ReviewWhereInput
  @Field(() => ReviewWhereInput)
  none: Prisma.ReviewWhereInput
}

@InputType()
//   implements Required<Prisma.ReviewRelationFilter>
export class ReviewRelationFilter {
  @Field(() => ReviewWhereInput)
  is?: ReviewWhereInput
  @Field(() => ReviewWhereInput)
  isNot?: ReviewWhereInput
}
