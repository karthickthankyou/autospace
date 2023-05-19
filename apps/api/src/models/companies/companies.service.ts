import { Injectable } from '@nestjs/common'
import { FindManyCompanyArgs, FindUniqueCompanyArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateCompanyInput } from './dto/create-company.input'
import { UpdateCompanyInput } from './dto/update-company.input'
import { GetUserType } from '@autospace-org/types'

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}
  create(
    { managerDisplayName, ...createCompanyInput }: CreateCompanyInput,
    user: GetUserType,
  ) {
    return this.prisma.company.create({
      data: {
        ...createCompanyInput,
        managers: {
          create: { uid: user.uid, displayName: managerDisplayName },
        },
      },
    })
  }

  findAll(args: FindManyCompanyArgs) {
    return this.prisma.company.findMany(args)
  }

  findOne(args: FindUniqueCompanyArgs) {
    return this.prisma.company.findUnique(args)
  }

  update(updateCompanyInput: UpdateCompanyInput) {
    const { id, ...data } = updateCompanyInput
    return this.prisma.company.update({
      where: { id: id },
      data: data,
    })
  }

  remove(args: FindUniqueCompanyArgs) {
    return this.prisma.company.delete(args)
  }
}
