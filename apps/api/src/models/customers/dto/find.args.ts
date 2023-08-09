import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CustomerOrderByWithRelationInput } from './orderBy.args'
import { CustomerWhereInput, CustomerWhereUniqueInput } from './where.args'

registerEnumType(Prisma.CustomerScalarFieldEnum, {
  name: 'CustomerScalarFieldEnum',
})

@ArgsType()
export class FindManyCustomerArgs
  implements Required<Omit<Prisma.CustomerFindManyArgs, 'include' | 'select'>>
{
  @Field(() => CustomerWhereInput, { nullable: true })
  where: CustomerWhereInput
  @Field(() => [CustomerOrderByWithRelationInput], { nullable: true })
  orderBy: CustomerOrderByWithRelationInput[]
  @Field(() => CustomerWhereUniqueInput, { nullable: true })
  cursor: CustomerWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.CustomerScalarFieldEnum], { nullable: true })
  distinct: Prisma.CustomerScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueCustomerArgs {
  @Field({ nullable: true })
  where: CustomerWhereUniqueInput
}
