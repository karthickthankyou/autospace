import { Global, Module } from '@nestjs/common'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Global()
@Module({
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
