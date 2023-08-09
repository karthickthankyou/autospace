import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ValetAssignmentOrderByWithRelationInput } from './orderBy.args'
import {
  ValetAssignmentWhereInput,
  ValetAssignmentWhereUniqueInput,
} from './where.args'

registerEnumType(Prisma.ValetAssignmentScalarFieldEnum, {
  name: 'ValetAssignmentScalarFieldEnum',
})

@ArgsType()
export class FindManyValetAssignmentArgs
  implements
    RestrictProperties<
      FindManyValetAssignmentArgs,
      Omit<Prisma.ValetAssignmentFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => ValetAssignmentWhereInput, { nullable: true })
  where: ValetAssignmentWhereInput
  @Field(() => [ValetAssignmentOrderByWithRelationInput], { nullable: true })
  orderBy: ValetAssignmentOrderByWithRelationInput[]
  @Field(() => ValetAssignmentWhereUniqueInput, { nullable: true })
  cursor: ValetAssignmentWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.ValetAssignmentScalarFieldEnum], { nullable: true })
  distinct: Prisma.ValetAssignmentScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueValetAssignmentArgs {
  @Field({ nullable: true })
  where: ValetAssignmentWhereUniqueInput
}
