import { Module } from '@nestjs/common';
import { PostgresqlModule } from '../database-modules/postgresql/postgresql.module';
import { ConfigModule } from '@nestjs/config';
import { FuncPaymentModule } from '../func-modules/func-payment/func-payment.module';
import { FuncNotificationModule } from '../func-modules/func-notification/func-notification.module';
import { FuncSubscriptionModule } from '../func-modules/func-subscription/func-subscription.module';
import { WebhookModule } from '../func-modules/webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresqlModule,
    FuncPaymentModule,
    FuncNotificationModule,
    FuncSubscriptionModule,
    WebhookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
