import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { AllExceptionsFilter } from './common/filters/allException'
const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')

  console.log(allowedOrigins)

  app.enableCors({
    origin: allowedOrigins,
    allowedHeaders: '*',
    methods: '*',
  })

  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(port, '0.0.0.0')
}
bootstrap()
