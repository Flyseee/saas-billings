import { Module } from '@nestjs/common';
import { SubscriptionModule } from '../../data-modules/subscription/subscription.module';
import { FuncSubscriptionController } from './func-subscription.controller';
import { FuncSubscriptionService } from './func-subscription.service';

@Module({
  imports: [SubscriptionModule],
  providers: [FuncSubscriptionService],
  controllers: [FuncSubscriptionController],
  exports: [FuncSubscriptionService],
})
export class FuncSubscriptionModule {}