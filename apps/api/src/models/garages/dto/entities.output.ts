import { Field, Int, ObjectType, PickType } from '@nestjs/graphql'
import { Slot } from 'src/models/slots/entities/slot.entity'

@ObjectType()
export class MinimalSlotGroupBy extends PickType(Slot, [
  'type',
  'pricePerHour',
]) {
  @Field(() => Int, { nullable: false })
  count: number
}
