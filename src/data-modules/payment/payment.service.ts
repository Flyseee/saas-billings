import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from './entities/payment.entity';
import { LessThan, Repository } from 'typeorm';
import { CreatePaymentAg } from './aggregation-object/create-payment.ag';
import { ReqUpdatePaymentDto } from './dto/request-dto/req-update-payment.dto';
import { PaymentStatus } from '../enums/payment-status.enum';
import { Cron } from '@nestjs/schedule';

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

  async get(id: string): Promise<Payment> {
    const entity: Payment | null = await this.paymentRepository.findOne({
      where: { id },
    });
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async update(updatePaymentDto: ReqUpdatePaymentDto): Promise<Payment> {
    const entity: Payment = await this.get(updatePaymentDto.id);
    if (this.isStatusUpdatable(entity.status, updatePaymentDto.status)) {
      Object.assign(entity, updatePaymentDto);
      return await this.paymentRepository.save(entity);
    }
    return entity;
  }

  private isStatusUpdatable(
    currentStatus: PaymentStatus,
    newStatus: PaymentStatus,
  ): boolean {
    const statusOrder = Object.values(PaymentStatus);
    return statusOrder.indexOf(newStatus) > statusOrder.indexOf(currentStatus);
  }

  @Cron('0 0 * * *')
  async deleteOldPayments() {
    const dateThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await this.paymentRepository.delete({
      createdAt: LessThan(dateThreshold),
    });
  }
}
