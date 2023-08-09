import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Garage } from '../garages/entities/garage.entity'
import { AddressesService } from './addresses.service'
import { CreateAddressInput } from './dto/create-address.input'
import { FindManyAddressArgs, FindUniqueAddressArgs } from './dto/find.args'
import { UpdateAddressInput } from './dto/update-address.input'
import { Address } from './entities/address.entity'

@Resolver(() => Address)
export class AddressesResolver {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Address)
  createAddress(@Args('createAddressInput') args: CreateAddressInput) {
    return this.addressesService.create(args)
  }

  @Query(() => [Address], { name: 'addresses' })
  findAll(@Args() args: FindManyAddressArgs) {
    return this.addressesService.findAll(args)
  }

  @Query(() => Address, { name: 'address' })
  findOne(@Args() args: FindUniqueAddressArgs) {
    return this.addressesService.findOne(args)
  }

  @Mutation(() => Address)
  updateAddress(@Args('updateAddressInput') args: UpdateAddressInput) {
    return this.addressesService.update(args)
  }

  @Mutation(() => Address)
  removeAddress(@Args() args: FindUniqueAddressArgs) {
    return this.addressesService.remove(args)
  }

  @ResolveField(() => Garage)
  garage(@Parent() address: Address) {
    return this.prisma.company.findFirst({ where: { id: address.garageId } })
  }
}
