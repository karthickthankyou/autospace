import { Injectable } from '@nestjs/common'
import { FindManyGarageArgs, FindUniqueGarageArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateGarageInput } from './dto/create-garage.input'
import { UpdateGarageInput } from './dto/update-garage.input'
import { SlotType } from '@prisma/client'

@Injectable()
export class GaragesService {
  constructor(private readonly prisma: PrismaService) {}
  create({
    address,
    companyId,
    description,
    displayName,
    slots,
  }: CreateGarageInput) {
    return this.prisma.garage.create({
      data: {
        address: { create: address },
        companyId,
        description,
        displayName,
        slots: {
          create: slots,
        },
      },
    })
  }

  findAll(args: FindManyGarageArgs) {
    return this.prisma.garage.findMany(args)
  }

  findOne(args: FindUniqueGarageArgs) {
    return this.prisma.garage.findUnique(args)
  }

  update(updateGarageInput: UpdateGarageInput) {
    const { id, address, slots, ...data } = updateGarageInput
    return this.prisma.garage.update({
      where: { id: id },
      data: data,
    })
  }

  remove(args: FindUniqueGarageArgs) {
    return this.prisma.garage.delete(args)
  }
}
