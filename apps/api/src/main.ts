import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    // origin: [
    //   'https://studio.apollographql.com',
    // ],
    // // credentials: true,
    // allowedHeaders:
    //   'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    // methods: 'POST,OPTIONS',
  })

  await app.listen(3000)
}
bootstrap()
