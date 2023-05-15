import { Field, ObjectType } from '@nestjs/graphql'
import { SlotType, Slot as SlotEnumType } from '@prisma/client'

type RestrictProperties<T, U> = {
  [K in keyof T]: K extends keyof U ? T[K] : never
}

@ObjectType()
export class Slot implements RestrictProperties<Slot, SlotEnumType> {
  id: number
  createdAt: Date
  updatedAt: Date
  @Field(() => String, { nullable: true })
  displayName: string
  @Field(() => Number)
  pricePerHour: number
  @Field(() => SlotType, { nullable: true })
  type: SlotType
  @Field(() => Number, { nullable: true })
  length: number
  @Field(() => Number, { nullable: true })
  width: number
  @Field(() => Number, { nullable: true })
  height: number
  garageId: number
}

@ObjectType()
export class ReturnCount {
  @Field()
  count: number
}
