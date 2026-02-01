import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { SubscriptionPlan } from '../../enums/subscription-plan.enum';

@Entity({ name: 'subscription' })
export class Subscription {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @OneToOne(() => User, (user) => user.subscription, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: SubscriptionPlan,
    default: SubscriptionPlan.FREE,
    name: 'plan',
  })
  plan: SubscriptionPlan;

  @Column({ type: 'timestamp with time zone', name: 'start_date', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp with time zone', name: 'end_date', nullable: true })
  endDate: Date;
}