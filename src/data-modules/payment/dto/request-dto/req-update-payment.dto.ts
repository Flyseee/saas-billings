import {
  IsEnum,
  IsUUID,
} from 'class-validator';
import { PaymentStatus } from '../../../enums/payment-status.enum';

export class ReqUpdatePaymentDto {
  @IsUUID()
  id: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
