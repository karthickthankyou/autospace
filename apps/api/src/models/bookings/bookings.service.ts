import { Injectable } from '@nestjs/common'
import { FindManyBookingArgs, FindUniqueBookingArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateBookingInput } from './dto/create-booking.input'
import { UpdateBookingInput } from './dto/update-booking.input'
import { generateSixDigitNumber } from 'src/common/util'
import { SlotType } from '@prisma/client'

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBookingInput: CreateBookingInput) {
    const passcode = generateSixDigitNumber().toString()

    const slot = await this.getFreeSlot({
      endTime: createBookingInput.endTime,
      startTime: createBookingInput.startTime,
      garageId: createBookingInput.garageId,
      type: createBookingInput.type,
    })

    return this.prisma.booking.create({
      data: { ...createBookingInput, passcode, slotId: slot.id },
    })
  }

  findAll(args: FindManyBookingArgs) {
    return this.prisma.booking.findMany(args)
  }

  findOne(args: FindUniqueBookingArgs) {
    return this.prisma.booking.findUnique(args)
  }

  update(updateBookingInput: UpdateBookingInput) {
    const { id, ...data } = updateBookingInput
    return this.prisma.booking.update({
      where: { id: id },
      data: data,
    })
  }

  remove(args: FindUniqueBookingArgs) {
    return this.prisma.booking.delete(args)
  }

  getFreeSlot({
    garageId,
    startTime,
    endTime,
    type,
  }: {
    garageId: number
    startTime: string | Date
    endTime: string | Date
    type: SlotType
  }) {
    return this.prisma.slot.findFirst({
      where: {
        garageId: garageId,
        type: type,
        bookings: {
          none: {
            OR: [
              { startTime: { lt: endTime }, endTime: { gt: startTime } },
              { startTime: { gt: startTime }, endTime: { lt: endTime } },
            ],
          },
        },
      },
    })
  }
}
