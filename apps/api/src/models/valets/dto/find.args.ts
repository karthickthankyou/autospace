import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ValetOrderByWithRelationInput } from './orderBy.args'
import { ValetWhereInput, ValetWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.ValetScalarFieldEnum, {
  name: 'ValetScalarFieldEnum',
})

@ArgsType()
export class FindManyValetArgs
  implements
    RestrictProperties<
      FindManyValetArgs,
      Omit<Prisma.ValetFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => ValetWhereInput, { nullable: true })
  where: ValetWhereInput
  @Field(() => [ValetOrderByWithRelationInput], { nullable: true })
  orderBy: ValetOrderByWithRelationInput[]
  @Field(() => ValetWhereUniqueInput, { nullable: true })
  cursor: ValetWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.ValetScalarFieldEnum], { nullable: true })
  distinct: Prisma.ValetScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueValetArgs {
  @Field({ nullable: true })
  where: ValetWhereUniqueInput
}
