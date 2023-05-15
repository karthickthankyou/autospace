import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { AdminOrderByWithRelationInput } from './orderBy.args'
import { AdminWhereInput, AdminWhereUniqueInput } from './where.args'

registerEnumType(Prisma.AdminScalarFieldEnum, {
  name: 'AdminScalarFieldEnum',
})

@ArgsType()
export class FindManyAdminArgs
  implements Required<Omit<Prisma.AdminFindManyArgs, 'include' | 'select'>>
{
  @Field(() => AdminWhereInput, { nullable: true })
  where: AdminWhereInput
  @Field(() => [AdminOrderByWithRelationInput], { nullable: true })
  orderBy: AdminOrderByWithRelationInput[]
  @Field(() => AdminWhereUniqueInput, { nullable: true })
  cursor: AdminWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.AdminScalarFieldEnum], { nullable: true })
  distinct: Prisma.AdminScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueAdminArgs {
  @Field({ nullable: true })
  where: AdminWhereUniqueInput
}
