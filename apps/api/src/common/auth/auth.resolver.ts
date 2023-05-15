import { BadRequestException } from '@nestjs/common'
import {
  Resolver,
  Mutation,
  Args,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql'

import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'

import { AuthService } from './auth.service'

import {
  LoginInput,
  LoginOutput,
  RefreshTokenInput,
  RefreshTokenOutput,
  RegisterInput,
  RegisterOutput,
  SetRoleInput,
} from './dto/auth.input'
import { checkRowLevelPermission } from 'src/common/guards'
import { GetUserType, Role } from '@autospace-org/types'

@Resolver(() => LoginOutput)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginOutput)
  async login(
    @Args('credentials') args: LoginInput,
    @Context() context: GraphQLExecutionContext,
  ) {
    const user = await this.authService.login(args)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = context.res
    this.authService.setAuthCookies(res, user)
    console.log('user ', user)
    return user
  }

  @Mutation(() => RegisterOutput)
  async register(
    @Args('credentials') args: RegisterInput,
    @Context() context: GraphQLExecutionContext,
  ) {
    const user = await this.authService.register(args)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = context.res
    this.authService.setAuthCookies(res, user)
    console.log('user ', user)
    return user
  }

  @Mutation(() => Boolean)
  logout(@Context() context: GraphQLExecutionContext): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = context.res

    res.clearCookie('authToken')
    res.clearCookie('uid')

    return true
  }

  @Mutation(() => RefreshTokenOutput)
  refreshToken(@Args('refreshTokenInput') args: RefreshTokenInput) {
    return this.authService.refreshToken(args)
  }

  @Mutation(() => Boolean)
  @AllowAuthenticated()
  setRole(
    @Args('setRoleInput') args: SetRoleInput,
    @GetUser() user: GetUserType,
  ) {
    const { uid, role } = args
    if (role === 'admin') {
      throw new BadRequestException(
        'Can not set admin role. Use setAdmin route.',
      )
    }
    checkRowLevelPermission(user, uid)
    return this.authService.setRole(uid, role as Role, user.roles)
  }

  @Mutation(() => Boolean)
  @AllowAuthenticated('admin')
  setAdmin(@Args('uid') uid: string, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, uid)
    return this.authService.setRole(uid, 'admin', user.roles)
  }
}
