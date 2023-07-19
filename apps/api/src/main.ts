import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
// import { AllExceptionsFilter } from './common/filters/allException'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  //   const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')

  //   console.log(allowedOrigins)

  //   app.useGlobalFilters(new AllExceptionsFilter())
  // Enable CORS for all origins
  app.enableCors()
  //     {
  //     origin: '*',
  //     allowedHeaders: '*',
  //     methods: '*',
  //   }

  await app.listen(3000)
}
bootstrap()
