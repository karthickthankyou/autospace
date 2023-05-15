import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { GarageOrderByWithRelationInput } from './orderBy.args'
import { GarageWhereInput, GarageWhereUniqueInput } from './where.args'

registerEnumType(Prisma.GarageScalarFieldEnum, {
  name: 'GarageScalarFieldEnum',
})

@ArgsType()
export class FindManyGarageArgs
  implements Required<Omit<Prisma.GarageFindManyArgs, 'include' | 'select'>>
{
  @Field(() => GarageWhereInput, { nullable: true })
  where: GarageWhereInput
  @Field(() => [GarageOrderByWithRelationInput], { nullable: true })
  orderBy: GarageOrderByWithRelationInput[]
  @Field(() => GarageWhereUniqueInput, { nullable: true })
  cursor: GarageWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.GarageScalarFieldEnum], { nullable: true })
  distinct: Prisma.GarageScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueGarageArgs {
  @Field({ nullable: true })
  where: GarageWhereUniqueInput
}
