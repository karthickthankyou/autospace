import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { AuthService } from 'src/common/auth/auth.service'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from '../../common/types'
import { Company } from '../companies/entities/company.entity'
import { CreateManagerInput } from './dto/create-manager.input'
import { FindManyManagerArgs, FindUniqueManagerArgs } from './dto/find.args'
import { UpdateManagerInput } from './dto/update-manager.input'
import { Manager } from './entities/manager.entity'
import { ManagersService } from './managers.service'

@Resolver(() => Manager)
export class ManagersResolver {
  constructor(
    private readonly managersService: ManagersService,
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Manager)
  async createManager(
    @Args('createManagerInput') args: CreateManagerInput,
    @GetUser() user: GetUserType,
  ) {
    await this.auth.setRole(user, 'manager')
    return this.managersService.create(args)
  }

  @Query(() => [Manager], { name: 'managers' })
  findAll(@Args() args: FindManyManagerArgs) {
    return this.managersService.findAll(args)
  }

  @AllowAuthenticated()
  @Query(() => Manager, { name: 'manager' })
  findOne(@Args() args: FindUniqueManagerArgs) {
    return this.managersService.findOne(args)
  }

  @Mutation(() => Manager)
  updateManager(@Args('updateManagerInput') args: UpdateManagerInput) {
    return this.managersService.update(args)
  }

  @Mutation(() => Manager)
  removeManager(@Args() args: FindUniqueManagerArgs) {
    return this.managersService.remove(args)
  }

  @ResolveField(() => Company)
  company(@Parent() manager: Manager) {
    return this.prisma.company.findUnique({ where: { id: manager.companyId } })
  }
}
