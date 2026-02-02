import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { ReqUpdateSubscriptionDto } from './dto/request-dto/req-update-subscription.dto';
import { ReqCreateSubscriptionDto } from './dto/request-dto/req-create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY')
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(
    reqCreateSubscriptionDto: ReqCreateSubscriptionDto,
  ): Promise<Subscription> {
    const entity: Subscription = this.subscriptionRepository.create(
      reqCreateSubscriptionDto,
    );
    return await this.subscriptionRepository.save(entity);
  }

  async get(id: string): Promise<Subscription> {
    const entity: Subscription | null =
      await this.subscriptionRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async update(
    updateSubscriptionDto: ReqUpdateSubscriptionDto,
  ): Promise<Subscription> {
    const entity: Subscription = await this.get(updateSubscriptionDto.id);
    Object.assign(entity, updateSubscriptionDto);
    return await this.subscriptionRepository.save(entity);
  }

  async delete(id: string): Promise<Subscription> {
    const entity: Subscription = await this.get(id);
    await this.subscriptionRepository.delete(id);
    return entity;
  }
}
