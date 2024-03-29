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
import { checkRowLevelPermission } from 'src/common/guards'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from '../../common/types'
import { Booking } from '../bookings/entities/booking.entity'
import { Garage } from '../garages/entities/garage.entity'
import { CreateSlotInput } from './dto/create-slot.input'
import { FindManySlotArgs, FindUniqueSlotArgs } from './dto/find.args'
import { UpdateSlotInput } from './dto/update-slot.input'
import { ReturnCount, Slot } from './entities/slot.entity'
import { SlotsService } from './slots.service'

@Resolver(() => Slot)
export class SlotsResolver {
  constructor(
    private readonly slotsService: SlotsService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Slot)
  createSlot(@Args('createSlotInput') args: CreateSlotInput) {
    return this.slotsService.create(args)
  }

  @AllowAuthenticated('manager')
  @Mutation(() => ReturnCount)
  async createManySlots(
    @Args('slots', {
      type: () => [CreateSlotInput],
    })
    args: CreateSlotInput[],
    @GetUser() user: GetUserType,
  ) {
    const garageIds = [...new Set(args.map((arg) => arg.garageId))]
    if (garageIds.length > 1) {
      throw new BadRequestException(
        'Can not create slots for more than one garage id.',
      )
    }

    const garageId = garageIds[0]

    const garage = await this.prisma.garage.findUnique({
      where: { id: garageId },
      include: {
        company: {
          include: { managers: true },
        },
      },
    })

    checkRowLevelPermission(
      user,
      garage.company.managers.map((manager) => manager.uid),
    )

    return this.prisma.slot.createMany({ data: args })
  }

  @Query(() => [Slot], { name: 'slots' })
  findAll(@Args() args: FindManySlotArgs) {
    return this.slotsService.findAll(args)
  }

  @Query(() => Slot, { name: 'slot' })
  findOne(@Args() args: FindUniqueSlotArgs) {
    return this.slotsService.findOne(args)
  }

  @Mutation(() => Slot)
  updateSlot(@Args('updateSlotInput') args: UpdateSlotInput) {
    return this.slotsService.update(args)
  }

  @Mutation(() => Slot)
  removeSlot(@Args() args: FindUniqueSlotArgs) {
    return this.slotsService.remove(args)
  }

  @ResolveField(() => Garage)
  garage(@Parent() slot: Slot) {
    return this.prisma.garage.findUnique({ where: { id: slot.garageId } })
  }

  @ResolveField(() => [Booking])
  bookings(@Parent() slot: Slot) {
    return this.prisma.booking.findMany({ where: { slotId: slot.id } })
  }
}
