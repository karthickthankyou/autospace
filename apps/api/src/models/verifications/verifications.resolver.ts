import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { VerificationsService } from './verifications.service'
import { Verification } from './entities/verification.entity'
import {
  FindManyVerificationArgs,
  FindUniqueVerificationArgs,
} from './dto/find.args'
import { CreateVerificationInput } from './dto/create-verification.input'
import { UpdateVerificationInput } from './dto/update-verification.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from '@autospace-org/types'
import { AdminsService } from '../admins/admins.service'
import { checkRowLevelPermission } from 'src/common/guards'

@AllowAuthenticated('admin')
@Resolver(() => Verification)
export class VerificationsResolver {
  constructor(
    private readonly verificationsService: VerificationsService,
    private readonly prisma: PrismaService,
    private readonly adminsService: AdminsService,
  ) {}

  @Mutation(() => Verification)
  async createVerification(
    @Args('createVerificationInput') args: CreateVerificationInput,
    @GetUser() user: GetUserType,
  ) {
    const admin = await this.adminsService.createIfNotExist({
      uid: args.adminId,
      displayName: '',
    })

    checkRowLevelPermission(user, admin.uid)

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
