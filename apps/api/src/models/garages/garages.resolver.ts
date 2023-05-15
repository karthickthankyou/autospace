import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { GaragesService } from './garages.service'
import { Garage } from './entities/garage.entity'
import { FindManyGarageArgs, FindUniqueGarageArgs } from './dto/find.args'
import { CreateGarageInput } from './dto/create-garage.input'
import { UpdateGarageInput } from './dto/update-garage.input'
import { Company } from '../companies/entities/company.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Slot } from '../slots/entities/slot.entity'
import { Address } from '../addresses/entities/address.entity'
import {
  DateFilterInput,
  GarageFilter,
  LocationFilterInput,
} from './dto/search-filter.input'
import { SlotWhereInput } from '../slots/dto/where.args'
import { MinimalSlotGroupBy } from './dto/entities.output'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { GarageWhereInput } from './dto/where.args'

@Resolver(() => Garage)
export class GaragesResolver {
  constructor(
    private readonly garagesService: GaragesService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Garage)
  createGarage(@Args('createGarageInput') args: CreateGarageInput) {
    return this.garagesService.create(args)
  }

  @Query(() => [Garage], { name: 'garages' })
  findAll(@Args() args: FindManyGarageArgs) {
    return this.garagesService.findAll(args)
  }

  @Query(() => Garage, { name: 'garage' })
  findOne(@Args() args: FindUniqueGarageArgs) {
    return this.garagesService.findOne(args)
  }

  @Query(() => [Garage], { name: 'searchGarages' })
  async searchGarages(
    @Args('dateFilter') dateFilter: DateFilterInput,
    @Args('locationFilter') locationFilter: LocationFilterInput,
    @Args('slotsFilter', { nullable: true }) slotsFilter: SlotWhereInput,
    @Args('garageFilter', { nullable: true }) args: GarageFilter,
  ) {
    const { start, end } = dateFilter
    const { nw_lat, nw_lng, se_lat, se_lng } = locationFilter

    let startDate = new Date(start)
    let endDate = new Date(end)
    const currentDate = new Date()

    if (startDate.getTime() < currentDate.getTime()) {
      //   throw new Error('Start date must be after current date')
      startDate = new Date()
    }
    if (startDate.getTime() > endDate.getTime()) {
      console.log(startDate.getTime(), endDate.getTime())
      const updatedEndDate = new Date()
      updatedEndDate.setSeconds(updatedEndDate.getSeconds() + 3600)
      endDate = updatedEndDate
      //   throw new Error('Start date must be before end date')
    }

    const { where = {}, ...garageFilters } = args || {}

    return this.prisma.garage.findMany({
      ...garageFilters,
      where: {
        ...where,
        address: {
          lat: { lte: nw_lat, gte: se_lat },
          lng: { gte: nw_lng, lte: se_lng },
        },
        slots: {
          some: {
            ...slotsFilter,
            bookings: {
              none: {
                OR: [
                  { startTime: { lt: endDate }, endTime: { gt: startDate } },
                  { startTime: { gt: startDate }, endTime: { lt: endDate } },
                ],
              },
            },
          },
        },
      },
    })
  }

  @Mutation(() => Garage)
  updateGarage(@Args('updateGarageInput') args: UpdateGarageInput) {
    return this.garagesService.update(args)
  }

  @Mutation(() => Garage)
  removeGarage(@Args() args: FindUniqueGarageArgs) {
    return this.garagesService.remove(args)
  }

  @ResolveField(() => Company)
  company(@Parent() garage: Garage) {
    return this.prisma.company.findFirst({ where: { id: garage.companyId } })
  }
  @ResolveField(() => Address)
  address(@Parent() garage: Garage) {
    return this.prisma.address.findFirst({ where: { garageId: garage.id } })
  }

  @ResolveField(() => [Slot])
  slots(@Parent() garage: Garage) {
    return this.prisma.slot.findMany({ where: { garageId: garage.id } })
  }

  @ResolveField(() => [MinimalSlotGroupBy], {
    name: 'availableSlots',
  })
  async availableSlots(
    @Parent() garage: Garage,
    @Args('slotsFilter', { nullable: true }) slotsFilter: SlotWhereInput,
    @Args('dateFilter') dateFilter: DateFilterInput,
  ) {
    const { start, end } = dateFilter
    const startDate = new Date(start)
    const endDate = new Date(end)

    const groupBySlots = await this.prisma.slot.groupBy({
      by: ['type'],
      _count: { type: true },
      _min: { pricePerHour: true },
      where: {
        ...slotsFilter,
        garageId: { equals: garage.id },
        bookings: {
          none: {
            OR: [
              {
                startTime: { lt: endDate },
                endTime: { gt: startDate },
              },
              {
                startTime: { gt: startDate },
                endTime: { lt: endDate },
              },
            ],
          },
        },
      },
    })
    console.log('groupBySlots', groupBySlots, startDate, endDate)
    return groupBySlots.map(({ _count, type, _min }) => ({
      type,
      count: _count.type,
      pricePerHour: _min.pricePerHour,
    }))
  }

  @Query(() => AggregateCountOutput, {
    name: 'garagesCount',
  })
  async garagesCount(
    @Args('where', { nullable: true })
    where: GarageWhereInput,
  ) {
    const garages = await this.prisma.garage.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: garages._count._all }
  }
}
