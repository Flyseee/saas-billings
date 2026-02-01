import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubscriptionPlan } from '../../enums/subscription-plan.enum';

@Entity({ name: 'subscription' })
export class Subscription {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: SubscriptionPlan,
    default: SubscriptionPlan.FREE,
    name: 'plan',
  })
  plan: SubscriptionPlan;

  @Column({
    type: 'timestamp with time zone',
    name: 'start_date',
    nullable: true,
  })
  startDate: Date;

  @Column({
    type: 'timestamp with time zone',
    name: 'end_date',
    nullable: true,
  })
  endDate: Date;
}
