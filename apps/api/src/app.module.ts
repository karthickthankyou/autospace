import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './common/auth/auth.module'
import { FirebaseModule } from './common/firebase/firebase.module'
import { ErrorLoggingMiddleware } from './common/middleware/ErrorLogging'
import { PrismaModule } from './common/prisma/prisma.module'
import { SentryModule } from './common/sentry/sentry.module'
import { AddressesModule } from './models/addresses/addresses.module'
import { AdminsModule } from './models/admins/admins.module'
import { BookingTimelinesModule } from './models/booking-timelines/booking-timelines.module'
import { BookingsModule } from './models/bookings/bookings.module'
import { CompaniesModule } from './models/companies/companies.module'
import { CustomersModule } from './models/customers/customers.module'
import { GaragesModule } from './models/garages/garages.module'
import { ManagersModule } from './models/managers/managers.module'
import { ReviewsModule } from './models/reviews/reviews.module'
import { ServicesModule } from './models/services/services.module'
import { SlotsModule } from './models/slots/slots.module'
import { StripeModule } from './models/stripe/stripe.module'
import { ValetAssignmentsModule } from './models/valet-assignments/valet-assignments.module'
import { ValetsModule } from './models/valets/valets.module'
import { VerificationsModule } from './models/verifications/verifications.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      introspection: true,
      context: ({ req, res }) => ({ req, res }),
    }),

    SentryModule,

    PrismaModule,
    FirebaseModule,
    AuthModule,

    StripeModule,

    AddressesModule,
    AdminsModule,
    BookingsModule,
    BookingTimelinesModule,
    CompaniesModule,
    CustomersModule,
    GaragesModule,
    ManagersModule,
    ReviewsModule,
    SlotsModule,
    ServicesModule,
    ValetsModule,
    ValetAssignmentsModule,
    VerificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorLoggingMiddleware).forRoutes('*')
  }
}
