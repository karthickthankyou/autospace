import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { AdminsService } from './admins.service'
import { Admin } from './entities/admin.entity'
import { FindManyAdminArgs, FindUniqueAdminArgs } from './dto/find.args'
import { CreateAdminInput } from './dto/create-admin.input'
import { UpdateAdminInput } from './dto/update-admin.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { AdminWhereInput } from './dto/where.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { AuthService } from 'src/common/auth/auth.service'
import { GetUserType } from '@autospace-org/types'

@AllowAuthenticated('admin')
@Resolver(() => Admin)
export class AdminsResolver {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
  ) {}

  @Mutation(() => Admin)
  async createAdmin(
    @Args('createAdminInput') args: CreateAdminInput,
    @GetUser() user: GetUserType,
  ) {
    await this.auth.setRole(user, 'admin')
    return this.adminsService.create(args)
  }

  @Query(() => [Admin], { name: 'admins' })
  findAll(@Args() args: FindManyAdminArgs) {
    return this.adminsService.findAll(args)
  }

  @Query(() => Admin, { name: 'admin' })
  findOne(@Args() args: FindUniqueAdminArgs) {
    return this.adminsService.findOne(args)
  }

  @Mutation(() => Admin)
  updateAdmin(@Args('updateAdminInput') args: UpdateAdminInput) {
    return this.adminsService.update(args)
  }

  @Mutation(() => Admin)
  removeAdmin(@Args() args: FindUniqueAdminArgs) {
    return this.adminsService.remove(args)
  }

  @Query(() => AggregateCountOutput, {
    name: 'adminsCount',
  })
  async garagesCount(
    @Args('where', { nullable: true })
    where: AdminWhereInput,
  ) {
    const admins = await this.prisma.garage.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: admins._count._all }
  }
}
