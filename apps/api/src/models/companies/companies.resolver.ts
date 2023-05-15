import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { CompaniesService } from './companies.service'
import { Company } from './entities/company.entity'
import { FindManyCompanyArgs, FindUniqueCompanyArgs } from './dto/find.args'
import { CreateCompanyInput } from './dto/create-company.input'
import { UpdateCompanyInput } from './dto/update-company.input'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { Garage } from '../garages/entities/garage.entity'
import { Manager } from '../managers/entities/manager.entity'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { GetUserType } from '@autospace-org/types'

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Company)
  async createCompany(
    @Args('createCompanyInput') args: CreateCompanyInput,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.companiesService.create(args, user)
    console.log('createCompanyInput ', args, company)
    return company
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
    console.log('user ', user)
    return this.prisma.company.findFirst({
      where: { manager: { uid: user.uid } },
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
