import { IsDate, IsEnum, IsNotEmpty, IsNotEmptyObject, IsObject, IsUUID, ValidateNested } from 'class-validator';
import { WebhookEventType } from '../../../enums/webhook-event-type.enum';
import { Type } from 'class-transformer';

class PaymentObject {
  @IsUUID()
  id: string;
}

export class ReqHandleNotificationDto {
  @IsUUID()
  id: string;

  @IsEnum(WebhookEventType)
  event: WebhookEventType;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PaymentObject)
  object: PaymentObject;

  @IsDate()
  @Type(() => Date)
  created_at: Date;
}
