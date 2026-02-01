import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { ReqHandleNotificationDto } from './dto/request-dto/req-handle-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepository: Repository<Notification>,
  ) {}

  async handleNotification(reqHandleNotificationDto: ReqHandleNotificationDto): Promise<Notification> {
    const entity: Notification = this.notificationRepository.create(
      reqHandleNotificationDto,
    );
    return await this.notificationRepository.save(entity);
  }
}
