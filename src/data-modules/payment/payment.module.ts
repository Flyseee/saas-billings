import { Module } from '@nestjs/common';
import { PostgresqlModule } from '../../database-modules/postgresql/postgresql.module';
import { PaymentService } from './payment.service';
import PaymentRepositoryProvider from './provider/payment-repository.provider';

@Module({
  imports: [PostgresqlModule],
  providers: [PaymentService, PaymentRepositoryProvider],
  exports: [PaymentService],
})
export class PaymentModule {}
