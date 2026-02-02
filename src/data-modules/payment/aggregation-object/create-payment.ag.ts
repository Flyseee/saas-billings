import { PaymentStatus } from '../../enums/payment-status.enum';
import { CurrencyType } from '../../enums/currency-type.enum';
import { PaymentMethod } from '../../enums/payment-method.enum';

export class CreatePaymentAg {
  subscriptionId: string;
  amount: number;
  status: PaymentStatus;
  currency: CurrencyType;
  createdAt: Date;
  paymentMethod: PaymentMethod;
  yookassaPaymentId: string;
  description: string;
  confirmation_url: string;
}
