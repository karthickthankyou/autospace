import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { BookingsService } from './bookings.service'
import { Booking } from './entities/booking.entity'
import { FindManyBookingArgs, FindUniqueBookingArgs } from './dto/find.args'
import { CreateBookingInput } from './dto/create-booking.input'
import { UpdateBookingInput } from './dto/update-booking.input'
import { Slot } from '../slots/entities/slot.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Customer } from '../customers/entities/customer.entity'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { GetUserType } from '@autospace-org/types'
import { checkRowLevelPermission } from 'src/common/guards'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { BookingWhereInput } from './dto/where.args'
import { BadRequestException } from '@nestjs/common'

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Booking)
  async createBooking(
    @Args('createBookingInput') args: CreateBookingInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.customerId)
    const customer = await this.prisma.customer.findUnique({
      where: { uid: args.customerId },
    })

    if (!customer?.uid) {
      await this.prisma.customer.create({ data: { uid: args.customerId } })
    }
    return this.bookingsService.create(args)
  }

  @AllowAuthenticated()
  @Query(() => [Booking], { name: 'bookings' })
  findAll(@Args() args: FindManyBookingArgs, @GetUser() user: GetUserType) {
    if (!args.where.customerId.equals) {
      throw new BadRequestException(
        'Customer id missing in args.where.customerId',
      )
    }
    checkRowLevelPermission(user, args.where.customerId.equals)
    return this.bookingsService.findAll(args)
  }

  @AllowAuthenticated()
  @Query(() => [Booking], { name: 'bookingsForGarage' })
  async bookingsForGarage(
    @Args()
    args: FindManyBookingArgs,
    @GetUser() user: GetUserType,
  ) {
    const garageId = args.where.slot.is.garageId.equals

    if (!args.where.slot.is.garageId.equals) {
      throw new BadRequestException(
        'Garage id missing in where.slot.is.garageId.equals',
      )
    }
    console.log('garageId ', garageId)
    const garage = await this.prisma.garage.findUnique({
      where: { id: garageId },
      include: { company: { include: { manager: true } } },
    })
    checkRowLevelPermission(user, garage.company.manager.uid)
    return this.prisma.booking.findMany(args)
  }

  @Query(() => AggregateCountOutput, {
    name: 'bookingsCount',
  })
  async garagesCount(
    @Args('where', { nullable: true })
    where: BookingWhereInput,
  ) {
    const bookings = await this.prisma.booking.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: bookings._count._all }
  }

  @Query(() => Booking, { name: 'booking' })
  findOne(@Args() args: FindUniqueBookingArgs) {
    return this.bookingsService.findOne(args)
  }

  @ResolveField(() => Slot)
  slot(@Parent() booking: Booking) {
    return this.prisma.slot.findFirst({ where: { id: booking.slotId } })
  }

  @ResolveField(() => Customer)
  customer(@Parent() booking: Booking) {
    return this.prisma.customer.findFirst({
      where: { uid: booking.customerId },
    })
  }
}
