import { Module } from '@nestjs/common';
import { PostgresqlModule } from '../../database-modules/postgresql/postgresql.module';
import { NotificationService } from './notification.service';
import NotificationRepositoryProvider from './provider/notification-repository.provider';

@Module({
  imports: [PostgresqlModule],
  providers: [NotificationService, NotificationRepositoryProvider],
  exports: [NotificationService],
})
export class NotificationModule {}
