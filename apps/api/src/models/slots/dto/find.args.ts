import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { SlotOrderByWithRelationInput } from './orderBy.args'
import { SlotWhereInput, SlotWhereUniqueInput } from './where.args'

registerEnumType(Prisma.SlotScalarFieldEnum, {
  name: 'SlotScalarFieldEnum',
})

@ArgsType()
export class FindManySlotArgs
  implements Required<Omit<Prisma.SlotFindManyArgs, 'include' | 'select'>>
{
  @Field(() => SlotWhereInput, { nullable: true })
  where: SlotWhereInput
  @Field(() => [SlotOrderByWithRelationInput], { nullable: true })
  orderBy: SlotOrderByWithRelationInput[]
  @Field(() => SlotWhereUniqueInput, { nullable: true })
  cursor: SlotWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.SlotScalarFieldEnum], { nullable: true })
  distinct: Prisma.SlotScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueSlotArgs {
  @Field({ nullable: true })
  where: SlotWhereUniqueInput
}
