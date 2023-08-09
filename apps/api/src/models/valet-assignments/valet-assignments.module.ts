import { Module } from '@nestjs/common'
import { ValetAssignmentsResolver } from './valet-assignments.resolver'
import { ValetAssignmentsService } from './valet-assignments.service'

@Module({
  providers: [ValetAssignmentsResolver, ValetAssignmentsService],
  exports: [ValetAssignmentsService],
})
export class ValetAssignmentsModule {}
