import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { AuthService } from 'src/common/auth/auth.service'
import { RegisterInput } from 'src/common/auth/dto/auth.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { FirebaseService } from 'src/common/firebase/firebase.service'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from '../../common/types'
import { Verification } from '../verifications/entities/verification.entity'
import { AdminsService } from './admins.service'
import { FindManyAdminArgs, FindUniqueAdminArgs } from './dto/find.args'
import { UpdateAdminInput } from './dto/update-admin.input'
import { AdminWhereInput } from './dto/where.args'
import { Admin } from './entities/admin.entity'

@AllowAuthenticated('admin')
@Resolver(() => Admin)
export class AdminsResolver {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
    private readonly firebase: FirebaseService,
  ) {}

  @Mutation(() => Admin)
  async createAdmin(
    @Args('createAdminInput')
    { displayName, email, password }: RegisterInput,
    @GetUser() user: GetUserType,
  ) {
    const newAdmin = await this.auth.register({ email, displayName, password })

    await this.auth.setRole(user, 'admin')
    return this.adminsService.create({ displayName, uid: newAdmin.uid })
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
  async removeAdmin(
    @Args() args: FindUniqueAdminArgs,
    @GetUser() user: GetUserType,
  ) {
    const deletedUser = await this.firebase.getAuth().deleteUser(args.where.uid)
    await this.auth.removeRole(user, 'admin')

    return this.adminsService.remove(args)
  }

  @Query(() => AggregateCountOutput, {
    name: 'adminsCount',
  })
  async adminsCount(
    @Args('where', { nullable: true })
    where: AdminWhereInput,
  ) {
    const admins = await this.prisma.admin.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: admins._count._all }
  }

  @ResolveField(() => [Verification])
  verifications(@Parent() parent: Admin) {
    return this.prisma.verification.findMany({
      where: { adminId: parent.uid },
    })
  }

  @ResolveField(() => Number)
  async verificationsCount(@Parent() parent: Admin) {
    return this.prisma.verification.count({
      where: { adminId: parent.uid },
    })
  }
}
