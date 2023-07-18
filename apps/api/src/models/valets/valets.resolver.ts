import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ValetsService } from './valets.service'
import { Valet } from './entities/valet.entity'
import { FindManyValetArgs, FindUniqueValetArgs } from './dto/find.args'
import { CreateValetInput } from './dto/create-valet.input'
import { UpdateValetInput } from './dto/update-valet.input'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { Booking } from '../bookings/entities/booking.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { BookingStatus } from '@prisma/client'
import { GetUserType } from '@autospace-org/types'
import { checkRowLevelPermission } from 'src/common/guards'
import { FindManyBookingArgs } from '../bookings/dto/find.args'

@AllowAuthenticated()
@Resolver(() => Valet)
export class ValetsResolver {
  constructor(
    private readonly valetsService: ValetsService,
    private readonly prisma: PrismaService,
  ) {}

  // Only managers can create valets
  @Mutation(() => Valet)
  async createValet(
    @Args('createValetInput') args: CreateValetInput,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.company.findFirst({
      where: { managers: { some: { uid: { equals: user.uid } } } },
    })
    return this.valetsService.create(args, company.id)
  }

  @Query(() => [Valet], { name: 'valets' })
  findAll(@Args() args: FindManyValetArgs) {
    return this.valetsService.findAll(args)
  }

  @Query(() => [Valet], { name: 'companyValets' })
  async companyValets(
    @Args() args: FindManyValetArgs,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.company.findFirst({
      where: { managers: { some: { uid: user.uid } } },
    })
    return this.valetsService.findAll({
      ...args,
      where: { ...args.where, companyId: { equals: company.id } },
    })
  }

  @Query(() => Valet, { name: 'valet' })
  findOne(@Args() args: FindUniqueValetArgs) {
    return this.valetsService.findOne(args)
  }

  @Mutation(() => Valet)
  updateValet(@Args('updateValetInput') args: UpdateValetInput) {
    return this.valetsService.update(args)
  }

  @Mutation(() => Valet)
  removeValet(@Args() args: FindUniqueValetArgs) {
    return this.valetsService.remove(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Booking)
  async assignValetForCheckInCheckOut(
    @Args('bookingId') bookingId: number,
    @Args('status') status: BookingStatus,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        slot: {
          select: {
            garage: {
              select: { company: { select: { managers: true, valets: true } } },
            },
          },
        },
      },
    })

    checkRowLevelPermission(user, [
      ...booking.slot.garage.company.managers.map((manager) => manager.uid),
      ...booking.slot.garage.company.valets.map((valet) => valet.uid),
    ])

    const [updatedBooking, bookingTimeline] = await this.prisma.$transaction([
      this.prisma.booking.update({
        where: { id: bookingId },
        data: {
          status,
          ...(status === BookingStatus.VALET_ASSIGNED_FOR_CHECK_IN && {
            valetAssignment: {
              update: { pickupValetId: user.uid },
            },
          }),
          ...(status === BookingStatus.VALET_ASSIGNED_FOR_CHECK_OUT && {
            valetAssignment: {
              update: { returnValetId: user.uid },
            },
          }),
        },
      }),
      this.prisma.bookingTimeline.create({
        data: {
          bookingId,
          valetId: user.uid,
          status,
        },
      }),
    ])

    return updatedBooking
  }
}
