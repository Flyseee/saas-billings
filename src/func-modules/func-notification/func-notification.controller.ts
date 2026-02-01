import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FuncNotificationService } from './func-notification.service';
import { ReqHandleNotificationDto } from '../../data-modules/notification/dto/request-dto/req-handle-notification.dto';

@Controller('webhook')
export class FuncNotificationController {
  constructor(
    private readonly funcNotificationService: FuncNotificationService,
  ) {}

  @Post('notification')
  @HttpCode(HttpStatus.OK)
  async handleNotification(
    @Body() reqHandleNotificationDto: ReqHandleNotificationDto
  ) {
    await this.funcNotificationService.handleNotification(
      reqHandleNotificationDto,
    );
  }
}
