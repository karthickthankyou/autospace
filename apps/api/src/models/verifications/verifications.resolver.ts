import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { VerificationsService } from './verifications.service'
import { Verification } from './entities/verification.entity'
import {
  FindManyVerificationArgs,
  FindUniqueVerificationArgs,
} from './dto/find.args'
import { CreateVerificationInput } from './dto/create-verification.input'
import { UpdateVerificationInput } from './dto/update-verification.input'
import { AllowAuthenticated } from 'src/common/decorators/auth/auth.decorator'

@AllowAuthenticated('admin')
@Resolver(() => Verification)
export class VerificationsResolver {
  constructor(private readonly verificationsService: VerificationsService) {}

  @Mutation(() => Verification)
  createVerification(
    @Args('createVerificationInput') args: CreateVerificationInput,
  ) {
    return this.verificationsService.create(args)
  }

  @Query(() => [Verification], { name: 'verifications' })
  findAll(@Args() args: FindManyVerificationArgs) {
    return this.verificationsService.findAll(args)
  }

  @Query(() => Verification, { name: 'verification' })
  findOne(@Args() args: FindUniqueVerificationArgs) {
    return this.verificationsService.findOne(args)
  }

  @Mutation(() => Verification)
  updateVerification(
    @Args('updateVerificationInput') args: UpdateVerificationInput,
  ) {
    return this.verificationsService.update(args)
  }

  @Mutation(() => Verification)
  removeVerification(@Args() args: FindUniqueVerificationArgs) {
    return this.verificationsService.remove(args)
  }
}
