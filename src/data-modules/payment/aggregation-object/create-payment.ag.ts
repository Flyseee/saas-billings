import { PaymentStatus } from '../../enums/payment-status.enum';
import { CurrencyType } from '../../enums/currency-type.enum';
import { PaymentMethod } from '../../enums/payment-method.enum';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePaymentAg {
  @IsNotEmpty()
  @IsUUID()
  subscriptionId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsNotEmpty()
  @IsEnum(CurrencyType)
  currency: CurrencyType;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsNotEmpty()
  @IsUUID()
  yookassaPaymentId: string;
}
