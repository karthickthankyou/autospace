import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateAdminInput } from './dto/create-admin.input'
import { FindManyAdminArgs, FindUniqueAdminArgs } from './dto/find.args'
import { UpdateAdminInput } from './dto/update-admin.input'

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createAdminInput: CreateAdminInput) {
    return this.prisma.admin.create({
      data: createAdminInput,
    })
  }

  async createIfNotExist(createAdminInput: CreateAdminInput) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        uid: createAdminInput.uid,
      },
    })

    if (!admin) {
      return this.prisma.admin.create({
        data: createAdminInput,
      })
    } else {
      return admin
    }
  }

  findAll(args: FindManyAdminArgs) {
    return this.prisma.admin.findMany(args)
  }

  findOne(args: FindUniqueAdminArgs) {
    return this.prisma.admin.findUnique(args)
  }

  update(updateAdminInput: UpdateAdminInput) {
    const { uid, ...data } = updateAdminInput
    return this.prisma.admin.update({
      where: { uid: uid },
      data: data,
    })
  }

  remove(args: FindUniqueAdminArgs) {
    return this.prisma.admin.delete(args)
  }
}
