import { Injectable } from '@nestjs/common';
import { PaymentService } from '../../data-modules/payment/payment.service';
import { ResCreatePaymentDto } from '../../data-modules/payment/dto/response-dto/res-create-payment.dto';
import {
  PaymentInfo,
  ReqCreatePaymentDto,
} from '../../data-modules/payment/dto/request-dto/req-create-payment.dto';
import { CreatePaymentAg } from '../../data-modules/payment/aggregation-object/create-payment.ag';

@Injectable()
export class FuncPaymentService {
  constructor(private readonly paymentService: PaymentService) {}

  async create(
    createPaymentDto: ReqCreatePaymentDto,
  ): Promise<ResCreatePaymentDto> {
    const payment: PaymentInfo = createPaymentDto.payment;
    const createPaymentAg: CreatePaymentAg = {
      subscriptionId: createPaymentDto.subscription_id,
      amount: payment.amount.value,
      status: payment.status,
      currency: payment.amount.currency,
      createdAt: payment.created_at,
      paymentMethod: payment.payment_method.type,
      yookassaPaymentId: payment.id,
    };
    return await this.paymentService.create(createPaymentAg);
  }
}
