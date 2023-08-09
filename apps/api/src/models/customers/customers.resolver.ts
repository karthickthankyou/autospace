import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Booking } from '../bookings/entities/booking.entity'
import { CustomersService } from './customers.service'
import { CreateCustomerInput } from './dto/create-customer.input'
import { FindManyCustomerArgs, FindUniqueCustomerArgs } from './dto/find.args'
import { UpdateCustomerInput } from './dto/update-customer.input'
import { Customer } from './entities/customer.entity'

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private readonly customersService: CustomersService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Customer)
  createCustomer(@Args('createCustomerInput') args: CreateCustomerInput) {
    return this.customersService.create(args)
  }

  @Query(() => [Customer], { name: 'customers' })
  findAll(@Args() args: FindManyCustomerArgs) {
    return this.customersService.findAll(args)
  }

  @Query(() => Customer, { name: 'customer' })
  findOne(@Args() args: FindUniqueCustomerArgs) {
    return this.customersService.findOne(args)
  }

  @Mutation(() => Customer)
  updateCustomer(@Args('updateCustomerInput') args: UpdateCustomerInput) {
    return this.customersService.update(args)
  }

  @Mutation(() => Customer)
  removeCustomer(@Args() args: FindUniqueCustomerArgs) {
    return this.customersService.remove(args)
  }

  @ResolveField(() => [Booking])
  bookings(@Parent() customer: Customer) {
    return this.prisma.booking.findMany({ where: { customerId: customer.uid } })
  }
}
