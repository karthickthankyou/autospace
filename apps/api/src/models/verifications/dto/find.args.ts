import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { WhereUniqueInputNumber } from 'src/common/dtos/common.input'
import { VerificationOrderByWithRelationInput } from './orderBy.args'
import {
  VerificationWhereInput,
  VerificationWhereUniqueInput,
} from './where.args'

registerEnumType(Prisma.VerificationScalarFieldEnum, {
  name: 'VerificationScalarFieldEnum',
})

@ArgsType()
export class FindManyVerificationArgs
  implements
    Required<Omit<Prisma.VerificationFindManyArgs, 'include' | 'select'>>
{
  @Field(() => VerificationWhereInput, { nullable: true })
  where: VerificationWhereInput
  @Field(() => [VerificationOrderByWithRelationInput], { nullable: true })
  orderBy: VerificationOrderByWithRelationInput[]
  @Field(() => VerificationWhereUniqueInput, { nullable: true })
  cursor: VerificationWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.VerificationScalarFieldEnum], { nullable: true })
  distinct: Prisma.VerificationScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueVerificationArgs {
  @Field({ nullable: true })
  where: VerificationWhereUniqueInput
}
