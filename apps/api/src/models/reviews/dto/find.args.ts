import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ReviewOrderByWithRelationInput } from './orderBy.args'
import { ReviewWhereInput, ReviewWhereUniqueInput } from './where.args'

registerEnumType(Prisma.ReviewScalarFieldEnum, {
  name: 'ReviewScalarFieldEnum',
})

@ArgsType()
export class FindManyReviewArgs
  implements Required<Omit<Prisma.ReviewFindManyArgs, 'include' | 'select'>>
{
  @Field(() => ReviewWhereInput, { nullable: true })
  where: ReviewWhereInput
  @Field(() => [ReviewOrderByWithRelationInput], { nullable: true })
  orderBy: ReviewOrderByWithRelationInput[]
  @Field(() => ReviewWhereUniqueInput, { nullable: true })
  cursor: ReviewWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.ReviewScalarFieldEnum], { nullable: true })
  distinct: Prisma.ReviewScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueReviewArgs {
  @Field({ nullable: true })
  where: ReviewWhereUniqueInput
}
