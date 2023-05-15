import { Injectable } from '@nestjs/common'
import { FindManyCustomerArgs, FindUniqueCustomerArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateCustomerInput } from './dto/create-customer.input'
import { UpdateCustomerInput } from './dto/update-customer.input'

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCustomerInput: CreateCustomerInput) {
    return this.prisma.customer.create({
      data: createCustomerInput,
    })
  }

  findAll(args: FindManyCustomerArgs) {
    return this.prisma.customer.findMany(args)
  }

  findOne(args: FindUniqueCustomerArgs) {
    return this.prisma.customer.findUnique(args)
  }

  update(updateCustomerInput: UpdateCustomerInput) {
    const { uid, ...data } = updateCustomerInput
    return this.prisma.customer.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueCustomerArgs) {
    return this.prisma.customer.delete(args)
  }
}
