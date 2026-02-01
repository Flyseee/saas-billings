import {
  IsEnum,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { PaymentStatus } from '../../../enums/payment-status.enum';

export class ReqUpdatePaymentDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
