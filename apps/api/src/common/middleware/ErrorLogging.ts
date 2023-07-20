import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class ErrorLoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      next()
    } catch (error) {
      console.error('Unhandled error:', error)
      throw error
    }
  }
}
