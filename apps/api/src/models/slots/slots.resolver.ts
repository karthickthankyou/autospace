import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { SlotsService } from './slots.service'
import { ReturnCount, Slot } from './entities/slot.entity'
import { FindManySlotArgs, FindUniqueSlotArgs } from './dto/find.args'
import { CreateSlotInput } from './dto/create-slot.input'
import { UpdateSlotInput } from './dto/update-slot.input'
import { Garage } from '../garages/entities/garage.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Booking } from '../bookings/entities/booking.entity'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { GetUserType } from '@autospace-org/types'
import { checkRowLevelPermission } from 'src/common/guards'
import { BadRequestException } from '@nestjs/common'

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

  @AllowAuthenticated('admin', 'manager')
  @Mutation(() => ReturnCount)
  async createManySlots(
    @Args('slots', {
      type: () => [CreateSlotInput],
    })
    args: CreateSlotInput[],

    @GetUser() user: GetUserType,
  ) {
    const garageIds = args.map((arg) => arg.garageId)
    if (garageIds.length !== 1) {
      throw new BadRequestException(
        'Can not create slots for more than one garage id.',
      )
    }

    const garageId = garageIds[0]

    const garage = await this.prisma.garage.findUnique({
      where: { id: garageId },
      include: {
        company: {
          include: { manager: true },
        },
      },
    })

    checkRowLevelPermission(user, garage.company.manager.uid)

    const a = args[0].pricePerHour
    console.log('a', a)

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
