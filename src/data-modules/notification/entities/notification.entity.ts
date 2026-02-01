import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WebhookEventType } from '../../enums/webhook-event-type.enum';
import { Payment } from '../../payment/entities/payment.entity';

@Entity({ name: 'notification' })
export class Notification {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({type:'enum', enum:WebhookEventType, name: 'event'})
  event: string;

  @ManyToOne(() => Payment, { onDelete: 'CASCADE' })
  payment: Payment;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;
}
