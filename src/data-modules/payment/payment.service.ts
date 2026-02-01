import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentAg } from './aggregation-object/create-payment.ag';
import { ReqUpdatePaymentDto } from './dto/request-dto/req-update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private paymentRepository: Repository<Payment>,
  ) {}

  async create(createPaymentAg: CreatePaymentAg): Promise<Payment> {
    const entity: Payment = this.paymentRepository.create(createPaymentAg);
    return await this.paymentRepository.save(entity);
  }

  async update(reqUpdatePaymentDto: ReqUpdatePaymentDto): Promise<Payment> {
    const entity = await this.paymentRepository.findOne({
      where: { id: reqUpdatePaymentDto.id },
    });
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    Object.assign(entity, reqUpdatePaymentDto);
    return await this.paymentRepository.save(entity);
  }
}
