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
import { BookingStatus } from '@prisma/client'
import { ValetAssignment } from '../valet-assignments/entities/valet-assignment.entity'

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
  @Query(() => [Booking], { name: 'valetPickups' })
  async valetPickups(
    @Args() args: FindManyBookingArgs,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.prisma.valet.findUnique({
      where: { uid: user.uid },
    })
    if (!valet) {
      throw new BadRequestException('You are not a valet.')
    }
    return this.prisma.booking.findMany({
      where: {
        slot: { garage: { companyId: valet.companyId } },
        // status: { equals: BookingStatus.BOOKED },
        valetAssignment: {
          pickupLat: { not: undefined },
          pickupValetId: null,
        },
      },
    })
  }

  @AllowAuthenticated()
  @Query(() => [Booking], { name: 'valetDrops' })
  async valetDrops(
    @Args() args: FindManyBookingArgs,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.prisma.valet.findUnique({
      where: { uid: user.uid },
    })
    if (!valet) {
      throw new BadRequestException('You are not a valet.')
    }
    return this.prisma.booking.findMany({
      where: {
        slot: { garage: { companyId: valet.companyId } },
        // status: { equals: BookingStatus.CHECKED_IN },
        valetAssignment: {
          returnLat: { not: null },
          returnValetId: null,
        },
      },
    })
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
      include: { company: { include: { managers: true } } },
    })
    checkRowLevelPermission(
      user,
      garage.company.managers.map((manager) => manager.uid),
    )
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

  @ResolveField(() => ValetAssignment)
  valetAssignment(@Parent() booking: Booking) {
    return this.prisma.valetAssignment.findFirst({
      where: { bookingId: booking.id },
    })
  }
}
