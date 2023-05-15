import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ReviewsService } from './reviews.service'
import { Review } from './entities/review.entity'
import { FindManyReviewArgs, FindUniqueReviewArgs } from './dto/find.args'
import { CreateReviewInput } from './dto/create-review.input'
import { UpdateReviewInput } from './dto/update-review.input'

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
