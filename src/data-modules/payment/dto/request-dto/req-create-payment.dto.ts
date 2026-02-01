import {
  IsDate,
  IsEnum,
  IsNotEmpty, IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsUUID, ValidateNested,
} from 'class-validator';
import { PaymentStatus } from '../../../enums/payment-status.enum';
import { CurrencyType } from '../../../enums/currency-type.enum';
import { PaymentMethod } from '../../../enums/payment-method.enum';
import { Type } from 'class-transformer';

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
  @IsUUID()
  id: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Amount)
  amount: Amount;

  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Payment)
  payment_method: Payment;

  @IsUUID()
  subscription_id: string;
}
