import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { BookingTimelinesService } from './booking-timelines.service'
import { BookingTimeline } from './entities/booking-timeline.entity'
import {
  FindManyBookingTimelineArgs,
  FindUniqueBookingTimelineArgs,
} from './dto/find.args'
import { CreateBookingTimelineInput } from './dto/create-booking-timeline.input'
import { UpdateBookingTimelineInput } from './dto/update-booking-timeline.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from '../../common/types'
import { checkRowLevelPermission } from 'src/common/guards'

@AllowAuthenticated('manager', 'admin')
@Resolver(() => BookingTimeline)
export class BookingTimelinesResolver {
  constructor(
    private readonly bookingTimelinesService: BookingTimelinesService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => BookingTimeline)
  async createBookingTimeline(
    @Args('createBookingTimelineInput')
    { bookingId, status }: CreateBookingTimelineInput,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        slot: {
          select: {
            garage: {
              select: {
                company: {
                  select: { managers: { select: { uid: true } } },
                },
              },
            },
          },
        },
      },
    })

    checkRowLevelPermission(
      user,
      booking.slot.garage.company.managers.map((manager) => manager.uid),
    )

    const [updatedBooking, bookingTimeline] = await this.prisma.$transaction([
      this.prisma.booking.update({
        data: { status: status },
        where: { id: bookingId },
      }),
      this.prisma.bookingTimeline.create({
        data: { bookingId, managerId: user.uid, status },
      }),
    ])
    return bookingTimeline
  }

  @Query(() => [BookingTimeline], { name: 'bookingTimelines' })
  findAll(@Args() args: FindManyBookingTimelineArgs) {
    return this.bookingTimelinesService.findAll(args)
  }

  @Query(() => BookingTimeline, { name: 'bookingTimeline' })
  findOne(@Args() args: FindUniqueBookingTimelineArgs) {
    return this.bookingTimelinesService.findOne(args)
  }

  @Mutation(() => BookingTimeline)
  updateBookingTimeline(
    @Args('updateBookingTimelineInput') args: UpdateBookingTimelineInput,
  ) {
    return this.bookingTimelinesService.update(args)
  }

  @Mutation(() => BookingTimeline)
  removeBookingTimeline(@Args() args: FindUniqueBookingTimelineArgs) {
    return this.bookingTimelinesService.remove(args)
  }
}
