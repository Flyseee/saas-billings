import { Injectable } from '@nestjs/common';
import { PaymentService } from '../../data-modules/payment/payment.service';
import { ResCreatePaymentDto } from '../../data-modules/payment/dto/response-dto/res-create-payment.dto';
import { ReqCreatePaymentDto } from '../../data-modules/payment/dto/request-dto/req-create-payment.dto';
import { CreatePaymentAg } from '../../data-modules/payment/aggregation-object/create-payment.ag';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { PaymentResponseAg } from '../../data-modules/payment/aggregation-object/payment-response.ag';

@Injectable()
export class FuncPaymentService {
  private readonly webhookUrl = 'http://localhost:3000/v1/webhook/notification';
  constructor(
    private readonly paymentService: PaymentService,
    private readonly configService: ConfigService,
  ) {}

  // async create(
  //   createPaymentDto: ReqCreatePaymentDto,
  // ): Promise<ResCreatePaymentDto> {
  //   const payment: PaymentInfo = createPaymentDto.payment;
  //   const createPaymentAg: CreatePaymentAg = {
  //     subscriptionId: createPaymentDto.subscription_id,
  //     amount: payment.amount.value,
  //     status: payment.status,
  //     currency: payment.amount.currency,
  //     createdAt: payment.created_at,
  //     paymentMethod: payment.payment_method.type,
  //     yookassaPaymentId: payment.id,
  //   };
  //   return await this.paymentService.create(createPaymentAg);
  // }

  async create(
    createPaymentDto: ReqCreatePaymentDto,
  ): Promise<ResCreatePaymentDto | undefined> {
    const shopId: string = this.configService.get<string>('SHOP_ID')!;
    const secretKey: string = this.configService.get<string>('SECRET_KEY')!;
    const uuid = await import('uuid');

    try {
      const response: AxiosResponse<PaymentResponseAg> = await axios.post(
        'https://api.yookassa.ru/v3/payments',
        {
          amount: {
            value: createPaymentDto.amount.toFixed(2),
            currency: createPaymentDto.currency,
          },
          payment_method_data: {
            type: createPaymentDto.paymentMethod,
          },
          confirmation: {
            type: 'redirect',
            return_url: this.webhookUrl,
          },
          description: createPaymentDto.description,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString('base64')}`,
            'Idempotence-Key': uuid.v4(),
            'Content-Type': 'application/json',
          },
        },
      );
      const createPaymentAg: CreatePaymentAg = {
        yookassaPaymentId: response.data.id,
        status: response.data.status,
        createdAt: response.data.created_at,
        confirmation_url: response.data.confirmation.confirmation_url,
        ...createPaymentDto,
      };

      return await this.paymentService.create(createPaymentAg);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `Error creating payment in Yookassa:`,
          error.response?.data,
        );
        throw new Error('Payment creation failed');
      } else {
        console.error(`Unexpected error:`, error);
      }
    }
  }
}
