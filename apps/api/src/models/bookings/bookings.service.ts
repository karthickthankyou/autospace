import { Injectable, NotFoundException } from '@nestjs/common'
import { FindManyBookingArgs, FindUniqueBookingArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateBookingInput } from './dto/create-booking.input'
import { generateSixDigitNumber } from 'src/common/util'
import { SlotType } from '@prisma/client'

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}
  async create({
    customerId,
    endTime,
    garageId,
    startTime,
    type,
    vehicleNumber,
    phoneNumber,
    services,
    valetAssignment,
  }: CreateBookingInput) {
    const passcode = generateSixDigitNumber().toString()

    const slot = await this.getFreeSlot({
      endTime,
      startTime,
      garageId,
      type,
    })

    if (!slot?.id) {
      throw new NotFoundException('No slots found.')
    }

    const booking = await this.prisma.booking.create({
      data: {
        endTime,
        startTime,
        vehicleNumber,
        customerId,
        phoneNumber,
        passcode,
        slotId: slot.id,
        services: {
          connect: services,
        },
        ...(valetAssignment
          ? {
              valetAssignment: {
                create: valetAssignment,
              },
            }
          : {}),
      },
    })
    console.log('booking ', booking)
    return booking
  }

  findAll(args: FindManyBookingArgs) {
    return this.prisma.booking.findMany(args)
  }

  findOne(args: FindUniqueBookingArgs) {
    return this.prisma.booking.findUnique(args)
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
