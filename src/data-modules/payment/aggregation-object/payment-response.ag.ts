import { PaymentStatus } from '../../enums/payment-status.enum';
import { CurrencyType } from '../../enums/currency-type.enum';
import { PaymentMethod } from '../../enums/payment-method.enum';

class Amount {
  value: number;
  currency: CurrencyType;
}

class PaymentMethodInfo {
  type: PaymentMethod;
}

class Confirmation {
  confirmation_url: string;
}

export class PaymentResponseAg {
  id: string;
  status: PaymentStatus;
  amount: Amount;
  confirmation: Confirmation;
  created_at: Date;
  payment_method: PaymentMethodInfo;
}
