import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateValetAssignmentInput } from './dto/create-valet-assignment.input'
import {
  FindManyValetAssignmentArgs,
  FindUniqueValetAssignmentArgs,
} from './dto/find.args'
import { UpdateValetAssignmentInput } from './dto/update-valet-assignment.input'

@Injectable()
export class ValetAssignmentsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createValetAssignmentInput: CreateValetAssignmentInput) {
    return this.prisma.valetAssignment.create({
      data: createValetAssignmentInput,
    })
  }

  findAll(args: FindManyValetAssignmentArgs) {
    return this.prisma.valetAssignment.findMany(args)
  }

  findOne(args: FindUniqueValetAssignmentArgs) {
    return this.prisma.valetAssignment.findUnique(args)
  }

  update(updateValetAssignmentInput: UpdateValetAssignmentInput) {
    const { bookingId, ...data } = updateValetAssignmentInput
    return this.prisma.valetAssignment.update({
      where: { bookingId },
      data: data,
    })
  }

  remove(args: FindUniqueValetAssignmentArgs) {
    return this.prisma.valetAssignment.delete(args)
  }
}
