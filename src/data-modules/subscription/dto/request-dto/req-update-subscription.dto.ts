import { IsDate, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { SubscriptionPlan } from '../../../enums/subscription-plan.enum';
import { Type } from 'class-transformer';

export class ReqUpdateSubscriptionDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEnum(SubscriptionPlan)
  plan: SubscriptionPlan;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
