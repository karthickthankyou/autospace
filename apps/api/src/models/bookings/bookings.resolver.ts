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

  @Query(() => [Booking], { name: 'bookings' })
  findAll(@Args() args: FindManyBookingArgs) {
    return this.bookingsService.findAll(args)
  }

  @Query(() => Booking, { name: 'booking' })
  findOne(@Args() args: FindUniqueBookingArgs) {
    return this.bookingsService.findOne(args)
  }

  @Mutation(() => Booking)
  updateBooking(@Args('updateBookingInput') args: UpdateBookingInput) {
    return this.bookingsService.update(args)
  }

  @Mutation(() => Booking)
  removeBooking(@Args() args: FindUniqueBookingArgs) {
    return this.bookingsService.remove(args)
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
