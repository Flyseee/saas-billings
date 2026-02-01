import { Injectable } from '@nestjs/common';
import { PaymentService } from '../../data-modules/payment/payment.service';
import { ResCreatePaymentDto } from '../../data-modules/payment/dto/response-dto/res-create-payment.dto';
import { ReqCreatePaymentDto } from '../../data-modules/payment/dto/request-dto/req-create-payment.dto';
import { CreatePaymentAg } from '../../data-modules/payment/aggregation-object/create-payment.ag';

@Injectable()
export class FuncPaymentService {
  constructor(private readonly paymentService: PaymentService) {}

  async create(createPaymentDto: ReqCreatePaymentDto): Promise<ResCreatePaymentDto> {
    const createPaymentAg: CreatePaymentAg = {
      subscriptionId: createPaymentDto.subscription_id,
      amount: createPaymentDto.amount.value,
      status: createPaymentDto.status,
      currency: createPaymentDto.amount.currency,
      createdAt: createPaymentDto.created_at,
      paymentMethod: createPaymentDto.payment_method.type,
      yookassaPaymentId: createPaymentDto.id
    }
    return await this.paymentService.create(createPaymentAg);
  }
}