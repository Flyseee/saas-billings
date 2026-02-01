import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsUUID,
} from 'class-validator';
import { PaymentStatus } from '../../../enums/payment-status.enum';
import { CurrencyType } from '../../../enums/currency-type.enum';
import { PaymentMethod } from '../../../enums/payment-method.enum';

class Amount {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsEnum(CurrencyType)
  currency: CurrencyType;
}

class Payment {
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  type: PaymentMethod;
}

export class ReqCreatePaymentDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsNotEmpty()
  @IsObject()
  amount: Amount;

  @IsNotEmpty()
  @IsObject()
  payment_method: Payment;

  @IsNotEmpty()
  @IsUUID()
  subscription_id: string;
}
