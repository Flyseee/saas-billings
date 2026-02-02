import { DataSource } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';

export default {
  provide: 'SUBSCRIPTION_REPOSITORY',
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(Subscription),
  inject: [DataSource],
};
