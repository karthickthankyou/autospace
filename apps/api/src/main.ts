import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { AllExceptionsFilter } from './common/filters/allException'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })

  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')

  //   console.log(allowedOrigins)

  app.enableCors({
    origin: allowedOrigins,
    allowedHeaders: '*',
    methods: '*',
  })

  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(3333)
}
bootstrap()
