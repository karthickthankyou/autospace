import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { CompaniesService } from './companies.service'
import { CreateCompanyInput } from './dto/create-company.input'
import { FindManyCompanyArgs, FindUniqueCompanyArgs } from './dto/find.args'
import { UpdateCompanyInput } from './dto/update-company.input'
import { Company } from './entities/company.entity'

import { AuthService } from 'src/common/auth/auth.service'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from '../../common/types'
import { Garage } from '../garages/entities/garage.entity'
import { Manager } from '../managers/entities/manager.entity'

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Company)
  async createCompany(
    @Args('createCompanyInput') args: CreateCompanyInput,
    @GetUser() user: GetUserType,
  ) {
    await this.auth.setRole(user, 'manager')
    return this.companiesService.create(args, user)
  }

  @Query(() => [Company], { name: 'companies' })
  findAll(@Args() args: FindManyCompanyArgs) {
    return this.companiesService.findAll(args)
  }

  @Query(() => Company, { name: 'company' })
  findOne(@Args() args: FindUniqueCompanyArgs) {
    return this.companiesService.findOne(args)
  }

  @AllowAuthenticated()
  @Query(() => Company, { name: 'myCompany' })
  myCompany(@GetUser() user: GetUserType) {
    return this.prisma.company.findFirst({
      where: { managers: { some: { uid: user.uid } } },
    })
  }

  @Mutation(() => Company)
  updateCompany(@Args('updateCompanyInput') args: UpdateCompanyInput) {
    return this.companiesService.update(args)
  }

  @Mutation(() => Company)
  removeCompany(@Args() args: FindUniqueCompanyArgs) {
    return this.companiesService.remove(args)
  }

  @ResolveField(() => [Garage])
  garages(@Parent() company: Company) {
    return this.prisma.garage.findMany({ where: { companyId: company.id } })
  }

  @ResolveField(() => [Manager])
  managers(@Parent() company: Company) {
    return this.prisma.manager.findMany({ where: { companyId: company.id } })
  }
}
