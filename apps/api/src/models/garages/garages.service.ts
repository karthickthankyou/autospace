import { Injectable } from '@nestjs/common'
import { FindManyGarageArgs, FindUniqueGarageArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateGarageInput } from './dto/create-garage.input'
import { UpdateGarageInput } from './dto/update-garage.input'

@Injectable()
export class GaragesService {
  constructor(private readonly prisma: PrismaService) {}
  async create({
    address,
    companyId,
    description,
    displayName,
    slots,
  }: CreateGarageInput & { companyId: number }) {
    const result = slots.flatMap((slot) =>
      Array(slot.count)
        .fill(slot)
        .map(({ count, ...item }, index) => item),
    )

    const garage = await this.prisma.garage.create({
      data: {
        address: { create: address },
        companyId,
        description,
        displayName,
        slots: {
          createMany: { data: result },
        },
      },
    })

    return garage
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
