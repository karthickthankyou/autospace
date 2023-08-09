import { BadRequestException } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import {
  AggregateCountOutput,
  PaginationInput,
} from 'src/common/dtos/common.input'
import { checkRowLevelPermission } from 'src/common/guards'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from '../../common/types'
import { Customer } from '../customers/entities/customer.entity'
import { Slot } from '../slots/entities/slot.entity'
import { ValetAssignment } from '../valet-assignments/entities/valet-assignment.entity'
import { ValetsService } from '../valets/valets.service'
import { BookingsService } from './bookings.service'
import { CreateBookingInput } from './dto/create-booking.input'
import { FindManyBookingArgs, FindUniqueBookingArgs } from './dto/find.args'
import { BookingWhereInput } from './dto/where.args'
import { Booking } from './entities/booking.entity'

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly valetsService: ValetsService,
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
  myBookings(@Args() args: FindManyBookingArgs, @GetUser() user: GetUserType) {
    // if (!args.where.customerId?.equals) {
    //   throw new BadRequestException(
    //     'Customer id missing in args.where.customerId',
    //   )
    // }
    // checkRowLevelPermission(user, args.where.customerId.equals)
    return this.bookingsService.findAll(args)
  }

  @AllowAuthenticated()
  @Query(() => [Booking], { name: 'valetPickups' })
  async valetPickups(
    @Args() { skip, take }: PaginationInput,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.valetsService.validValet(user.uid)
    return this.prisma.booking.findMany({
      skip,
      take,
      where: {
        slot: { garage: { companyId: valet.companyId } },
        valetAssignment: this.pickupAssignmentCondition,
      },
    })
  }

  @AllowAuthenticated()
  @Query(() => [Booking], { name: 'valetDrops' })
  async valetDrops(
    @Args() { skip, take }: PaginationInput,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.valetsService.validValet(user.uid)

    return this.prisma.booking.findMany({
      skip,
      take,
      where: {
        slot: { garage: { companyId: valet.companyId } },
        valetAssignment: this.dropAssignmentCondition,
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

  @ResolveField(() => ValetAssignment, { nullable: true })
  valetAssignment(@Parent() booking: Booking) {
    return this.prisma.valetAssignment.findFirst({
      where: { bookingId: booking.id },
    })
  }

  private readonly pickupAssignmentCondition = {
    pickupLat: { not: undefined },
    pickupValetId: null,
  }

  private readonly dropAssignmentCondition = {
    returnLat: { not: null },
    returnValetId: null,
  }
}
