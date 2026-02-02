import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { FuncSubscriptionService } from './func-subscription.service';
import { Subscription } from '../../data-modules/subscription/entities/subscription.entity';
import { ReqUpdateSubscriptionDto } from '../../data-modules/subscription/dto/request-dto/req-update-subscription.dto';

@Controller('subscription')
export class FuncSubscriptionController {
  constructor(
    private readonly funcSubscriptionService: FuncSubscriptionService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: string): Promise<Subscription> {
    return this.funcSubscriptionService.get(id);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateSubscriptionDto: ReqUpdateSubscriptionDto,
  ): Promise<Subscription> {
    return this.funcSubscriptionService.update(updateSubscriptionDto);
  }
}
