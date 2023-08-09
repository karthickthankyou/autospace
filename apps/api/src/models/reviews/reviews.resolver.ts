import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateReviewInput } from './dto/create-review.input'
import { FindManyReviewArgs, FindUniqueReviewArgs } from './dto/find.args'
import { UpdateReviewInput } from './dto/update-review.input'
import { Review } from './entities/review.entity'
import { ReviewsService } from './reviews.service'

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  createReview(@Args('createReviewInput') args: CreateReviewInput) {
    return this.reviewsService.create(args)
  }

  @Query(() => [Review], { name: 'reviews' })
  findAll(@Args() args: FindManyReviewArgs) {
    return this.reviewsService.findAll(args)
  }

  @Query(() => Review, { name: 'review' })
  findOne(@Args() args: FindUniqueReviewArgs) {
    return this.reviewsService.findOne(args)
  }

  @Mutation(() => Review)
  updateReview(@Args('updateReviewInput') args: UpdateReviewInput) {
    return this.reviewsService.update(args)
  }

  @Mutation(() => Review)
  removeReview(@Args() args: FindUniqueReviewArgs) {
    return this.reviewsService.remove(args)
  }
}
