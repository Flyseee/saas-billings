import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { ReqUpdateSubscriptionDto } from './dto/request-dto/req-update-subscription.dto';
import { ReqCreateSubscriptionDto } from './dto/request-dto/req-create-subscription.dto';
import { Cron } from '@nestjs/schedule';
import { SubscriptionPlan } from '../enums/subscription-plan.enum';

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

  @Cron('0 0 * * *')
  async handleExpiredSubscriptions() {
    const now = new Date();
    const expiredSubscriptions = await this.subscriptionRepository.find({
      where: {
        endDate: LessThan(now),
      },
    });

    for (const subscription of expiredSubscriptions) {
      const oldPlan = subscription.plan;
      subscription.plan = SubscriptionPlan.FREE;
      subscription.startDate = null;
      subscription.endDate = null;
      await this.subscriptionRepository.save(subscription);
      console.log(
        `Subscription ${subscription.id} with subscription plan /"${oldPlan}/" has been canceled.`,
      );
    }
  }
}
