import { ObjectType } from '@nestjs/graphql'
import { Verification as VerificationType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Verification
  implements RestrictProperties<Verification, VerificationType>
{
  garageId: number
  createdAt: Date
  updatedAt: Date
  verified: boolean
  adminId: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
