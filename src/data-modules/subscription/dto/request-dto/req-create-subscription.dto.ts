import { IsDate, IsEnum, IsUUID } from 'class-validator';
import { SubscriptionPlan } from '../../../enums/subscription-plan.enum';
import { Type } from 'class-transformer';

export class ReqCreateSubscriptionDto {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsEnum(SubscriptionPlan)
  plan: SubscriptionPlan;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
