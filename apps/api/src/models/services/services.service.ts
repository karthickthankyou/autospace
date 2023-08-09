import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateServiceInput } from './dto/create-service.input'
import { FindManyServiceArgs, FindUniqueServiceArgs } from './dto/find.args'
import { UpdateServiceInput } from './dto/update-service.input'

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createServiceInput: CreateServiceInput) {
    return this.prisma.service.create({
      data: createServiceInput,
    })
  }

  findAll(args: FindManyServiceArgs) {
    return this.prisma.service.findMany(args)
  }

  findOne(args: FindUniqueServiceArgs) {
    return this.prisma.service.findUnique(args)
  }

  update(updateServiceInput: UpdateServiceInput) {
    const { id, ...data } = updateServiceInput
    return this.prisma.service.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueServiceArgs) {
    return this.prisma.service.delete(args)
  }
}
