import { Module } from '@nestjs/common';
import { PostgresqlModule } from '../../database-modules/postgresql/postgresql.module';
import { SubscriptionService } from './subscription.service';
import SubscriptionRepositoryProvider from './provider/subscription-repository.provider';

@Module({
  imports: [PostgresqlModule],
  providers: [SubscriptionService, SubscriptionRepositoryProvider],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
