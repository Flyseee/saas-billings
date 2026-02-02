import { Subscription } from '../../../subscription/entities/subscription.entity';
import { PaymentStatus } from '../../../enums/payment-status.enum';
import { CurrencyType } from '../../../enums/currency-type.enum';
import { PaymentMethod } from '../../../enums/payment-method.enum';

export class ResCreatePaymentDto {
  id: string;
  subscription: Subscription;
  amount: number;
  status: PaymentStatus;
  currency: CurrencyType;
  createdAt: Date;
  paymentMethod: PaymentMethod;
  yookassaPaymentId: string;
  confirmationUrl: string;
}