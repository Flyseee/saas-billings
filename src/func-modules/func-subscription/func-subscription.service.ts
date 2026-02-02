import { Injectable } from '@nestjs/common';
import { SubscriptionService } from '../../data-modules/subscription/subscription.service';
import { Subscription } from '../../data-modules/subscription/entities/subscription.entity';
import { ReqUpdateSubscriptionDto } from '../../data-modules/subscription/dto/request-dto/req-update-subscription.dto';

@Injectable()
export class FuncSubscriptionService {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  get(id: string): Promise<Subscription> {
    return this.subscriptionService.get(id);
  }

  update(
    updateSubscriptionDto: ReqUpdateSubscriptionDto,
  ): Promise<Subscription> {
    return this.subscriptionService.update(updateSubscriptionDto);
  }
}
