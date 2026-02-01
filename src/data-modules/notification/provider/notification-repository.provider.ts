import { DataSource } from 'typeorm';
import { Notification } from '../entities/notification.entity';

export default {
  provide: 'NOTIFICATION_REPOSITORY',
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(Notification),
  inject: [DataSource],
};
