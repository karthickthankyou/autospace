import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ValetAssignmentsService } from './valet-assignments.service'
import { ValetAssignment } from './entities/valet-assignment.entity'
import {
  FindManyValetAssignmentArgs,
  FindUniqueValetAssignmentArgs,
} from './dto/find.args'
import { CreateValetAssignmentInput } from './dto/create-valet-assignment.input'
import { UpdateValetAssignmentInput } from './dto/update-valet-assignment.input'
import { Valet } from '../valets/entities/valet.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => ValetAssignment)
export class ValetAssignmentsResolver {
  constructor(
    private readonly valetAssignmentsService: ValetAssignmentsService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => ValetAssignment)
  createValetAssignment(
    @Args('createValetAssignmentInput') args: CreateValetAssignmentInput,
  ) {
    return this.valetAssignmentsService.create(args)
  }

  @Query(() => [ValetAssignment], { name: 'valetAssignments' })
  findAll(@Args() args: FindManyValetAssignmentArgs) {
    return this.valetAssignmentsService.findAll(args)
  }

  @Query(() => ValetAssignment, { name: 'valetAssignment' })
  findOne(@Args() args: FindUniqueValetAssignmentArgs) {
    return this.valetAssignmentsService.findOne(args)
  }

  @Mutation(() => ValetAssignment)
  updateValetAssignment(
    @Args('updateValetAssignmentInput') args: UpdateValetAssignmentInput,
  ) {
    return this.valetAssignmentsService.update(args)
  }

  @Mutation(() => ValetAssignment)
  removeValetAssignment(@Args() args: FindUniqueValetAssignmentArgs) {
    return this.valetAssignmentsService.remove(args)
  }

  @ResolveField(() => Valet, { nullable: true })
  pickupValet(@Parent() parent: ValetAssignment) {
    if (!parent.pickupValetId) {
      return null
    }
    return this.prisma.valet.findUnique({
      where: { uid: parent.pickupValetId },
    })
  }

  @ResolveField(() => Valet, { nullable: true })
  returnValet(@Parent() parent: ValetAssignment) {
    if (!parent.returnValetId) {
      return null
    }
    return this.prisma.valet.findUnique({
      where: { uid: parent.returnValetId },
    })
  }
}
