import { Injectable, NotFoundException } from '@nestjs/common'
import { SlotType } from '@prisma/client'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { generateSixDigitNumber } from 'src/common/util'
import { CreateBookingInput } from './dto/create-booking.input'
import { FindManyBookingArgs, FindUniqueBookingArgs } from './dto/find.args'

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
    valetAssignment,
  }: CreateBookingInput) {
    // Create customer
    const customer = await this.prisma.customer.findUnique({
      where: { uid: customerId },
    })

    if (!customer?.uid) {
      await this.prisma.customer.create({
        data: { uid: customerId },
      })
    }

    const passcode = generateSixDigitNumber().toString()

    // If startTime or endTime are strings, convert them to Date objects
    if (typeof startTime === 'string') {
      startTime = new Date(startTime)
    }
    if (typeof endTime === 'string') {
      endTime = new Date(endTime)
    }

    const slot = await this.getFreeSlot({
      endTime,
      startTime,
      garageId,
      type,
    })

    if (!slot) {
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
        ...(valetAssignment
          ? {
              valetAssignment: {
                create: valetAssignment,
              },
            }
          : {}),
      },
    })

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
