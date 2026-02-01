import { Module } from '@nestjs/common';
import { PaymentModule } from '../../data-modules/payment/payment.module';
import { FuncPaymentService } from './func-payment.service';
import { FuncPaymentController } from './func-payment.controller';

@Module({
  imports: [PaymentModule],
  providers: [FuncPaymentService],
  controllers: [FuncPaymentController],
  exports: [FuncPaymentService],
})
export class FuncPaymentModule {}