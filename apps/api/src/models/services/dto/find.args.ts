import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ServiceOrderByWithRelationInput } from './orderBy.args'
import { ServiceWhereInput, ServiceWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.ServiceScalarFieldEnum, {
  name: 'ServiceScalarFieldEnum',
})

@ArgsType()
export class FindManyServiceArgs
  implements
    RestrictProperties<
      FindManyServiceArgs,
      Omit<Prisma.ServiceFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => ServiceWhereInput, { nullable: true })
  where: ServiceWhereInput
  @Field(() => [ServiceOrderByWithRelationInput], { nullable: true })
  orderBy: ServiceOrderByWithRelationInput[]
  @Field(() => ServiceWhereUniqueInput, { nullable: true })
  cursor: ServiceWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.ServiceScalarFieldEnum], { nullable: true })
  distinct: Prisma.ServiceScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueServiceArgs {
  @Field({ nullable: true })
  where: ServiceWhereUniqueInput
}
