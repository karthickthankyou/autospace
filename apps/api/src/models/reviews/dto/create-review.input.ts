import { InputType, PickType } from '@nestjs/graphql'
import { Review } from '../entities/review.entity'

@InputType()
export class CreateReviewInput extends PickType(
  Review,
  ['comment', 'customerId', 'rating', 'garageId'],
  InputType,
) {}
