import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationService } from '../../data-modules/notification/notification.service';
import { ReqHandleNotificationDto } from '../../data-modules/notification/dto/request-dto/req-handle-notification.dto';
import { PaymentService } from '../../data-modules/payment/payment.service';
import { PaymentStatus } from '../../data-modules/enums/payment-status.enum';

@Injectable()
export class FuncNotificationService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly paymentService: PaymentService,
  ) {}

  async handleNotification(
    reqHandleNotificationDto: ReqHandleNotificationDto,
  ): Promise<void> {
    const [eventTypeSection, status] =
      reqHandleNotificationDto.event.split('.');
    if (eventTypeSection === 'payment') {
      const paymentStatus = status as PaymentStatus;

      if (!Object.values(PaymentStatus).includes(paymentStatus)) {
        throw new Error(`Invalid payment status: ${status}`);
      }

      try {
        await this.paymentService.update({
          id: reqHandleNotificationDto.object.id,
          status: paymentStatus,
        });
      } catch (error) {
        /**
         * @bugfix Вам нужно подтвердить, что вы получили уведомление. Для этого ответьте кодом состояния HTTP 200.
         * ЮKassa проигнорирует всё, что будет находиться в теле или заголовках ответа.
         * Ответы с любыми другими кодами состояний HTTP будут считаться невалидными,
         * и ЮKassa продолжит доставлять уведомление в течение 24 часов, начиная с момента, когда событие произошло.
         * @LINK https://yookassa.ru/developers/using-api/webhooks#using
         */
        if (error instanceof NotFoundException) {
          return;
        }
        throw error;
      }
    }

    await this.notificationService.handleNotification(reqHandleNotificationDto);
  }
}
