import { DataSource } from 'typeorm';
import { Payment } from '../entities/payment.entity';

export default {
  provide: 'PAYMENT_REPOSITORY',
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(Payment),
  inject: [DataSource],
};
