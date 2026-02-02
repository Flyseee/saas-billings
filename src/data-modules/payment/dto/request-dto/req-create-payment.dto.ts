import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { CurrencyType } from '../../../enums/currency-type.enum';
import { PaymentMethod } from '../../../enums/payment-method.enum';

export class ReqCreatePaymentDto {
  @IsUUID()
  subscriptionId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsEnum(CurrencyType)
  currency: CurrencyType;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsString()
  @IsNotEmpty()
  description: string;
}
