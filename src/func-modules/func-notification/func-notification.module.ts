import { Module } from '@nestjs/common';
import { NotificationModule } from '../../data-modules/notification/notification.module';
import { FuncNotificationService } from './func-notification.service';
import { FuncNotificationController } from './func-notification.controller';
import { PaymentModule } from '../../data-modules/payment/payment.module';

@Module({
  imports: [NotificationModule, PaymentModule],
  providers: [FuncNotificationService],
  controllers: [FuncNotificationController],
  exports: [FuncNotificationService],
})
export class FuncNotificationModule {}
