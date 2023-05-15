import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CompanyOrderByWithRelationInput } from './orderBy.args'
import { CompanyWhereInput, CompanyWhereUniqueInput } from './where.args'

registerEnumType(Prisma.CompanyScalarFieldEnum, {
  name: 'CompanyScalarFieldEnum',
})

@ArgsType()
export class FindManyCompanyArgs
  implements Required<Omit<Prisma.CompanyFindManyArgs, 'include' | 'select'>>
{
  @Field(() => CompanyWhereInput, { nullable: true })
  where: CompanyWhereInput
  @Field(() => [CompanyOrderByWithRelationInput], { nullable: true })
  orderBy: CompanyOrderByWithRelationInput[]
  @Field(() => CompanyWhereUniqueInput, { nullable: true })
  cursor: CompanyWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.CompanyScalarFieldEnum], { nullable: true })
  distinct: Prisma.CompanyScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueCompanyArgs {
  @Field({ nullable: true })
  where: CompanyWhereUniqueInput
}
