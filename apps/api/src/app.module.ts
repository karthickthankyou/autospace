import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { PrismaModule } from './common/prisma/prisma.module'
import { AddressesModule } from './models/addresses/addresses.module'
import { AdminsModule } from './models/admins/admins.module'
import { BookingsModule } from './models/bookings/bookings.module'
import { CompaniesModule } from './models/companies/companies.module'
import { CustomersModule } from './models/customers/customers.module'
import { GaragesModule } from './models/garages/garages.module'
import { ManagersModule } from './models/managers/managers.module'
import { ReviewsModule } from './models/reviews/reviews.module'
import { SlotsModule } from './models/slots/slots.module'
import { VerificationsModule } from './models/verifications/verifications.module'
import { FirebaseModule } from './common/firebase/firebase.module'
import { AuthModule } from './common/auth/auth.module'
import { StripeModule } from './models/stripe/stripe.module'
import { BookingTimelinesModule } from './models/booking-timelines/booking-timelines.module'

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
      context: ({ req, res }) => ({ req, res }),
    }),

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
    VerificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
