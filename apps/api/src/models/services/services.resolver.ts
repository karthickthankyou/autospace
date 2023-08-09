import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateServiceInput } from './dto/create-service.input'
import { FindManyServiceArgs, FindUniqueServiceArgs } from './dto/find.args'
import { UpdateServiceInput } from './dto/update-service.input'
import { Service } from './entities/service.entity'
import { ServicesService } from './services.service'

@Resolver(() => Service)
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Mutation(() => Service)
  createService(@Args('createServiceInput') args: CreateServiceInput) {
    return this.servicesService.create(args)
  }

  @Query(() => [Service], { name: 'services' })
  findAll(@Args() args: FindManyServiceArgs) {
    return this.servicesService.findAll(args)
  }

  @Query(() => Service, { name: 'service' })
  findOne(@Args() args: FindUniqueServiceArgs) {
    return this.servicesService.findOne(args)
  }

  @Mutation(() => Service)
  updateService(@Args('updateServiceInput') args: UpdateServiceInput) {
    return this.servicesService.update(args)
  }

  @Mutation(() => Service)
  removeService(@Args() args: FindUniqueServiceArgs) {
    return this.servicesService.remove(args)
  }
}
