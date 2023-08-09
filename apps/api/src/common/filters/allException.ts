import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { GqlArgumentsHost } from '@nestjs/graphql'
import * as Sentry from '@sentry/node'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('Request exception caught:', exception)
    const isHttp = host.getType() === 'http'
    let request
    let response

    if (isHttp) {
      const httpHost = host.switchToHttp()
      request = httpHost.getRequest()
      response = httpHost.getResponse()
    } else {
      const gqlHost = GqlArgumentsHost.create(host)
      const ctx = gqlHost.getContext()
      request = ctx.req
    }

    Sentry.withScope((scope) => {
      scope.setUser({
        ip_address: request.ip,
        // other user details if available
      })

      scope.setExtra('exception', exception)

      Sentry.captureException(exception)
    })

    // If it's a HTTP request, send a response
    if (isHttp) {
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        exception,
      })
    }
  }
}
