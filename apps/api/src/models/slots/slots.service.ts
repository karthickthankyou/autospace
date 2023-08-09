import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateSlotInput } from './dto/create-slot.input'
import { FindManySlotArgs, FindUniqueSlotArgs } from './dto/find.args'
import { UpdateSlotInput } from './dto/update-slot.input'

@Injectable()
export class SlotsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSlotInput: CreateSlotInput) {
    return this.prisma.slot.create({
      data: createSlotInput,
    })
  }

  findAll(args: FindManySlotArgs) {
    return this.prisma.slot.findMany(args)
  }

  findOne(args: FindUniqueSlotArgs) {
    return this.prisma.slot.findUnique(args)
  }

  update(updateSlotInput: UpdateSlotInput) {
    const { id, ...data } = updateSlotInput
    return this.prisma.slot.update({
      where: { id: id },
      data: data,
    })
  }

  remove(args: FindUniqueSlotArgs) {
    return this.prisma.slot.delete(args)
  }
}
