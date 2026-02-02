import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Subscription } from '../../subscription/entities/subscription.entity';
import { PaymentStatus } from '../../enums/payment-status.enum';
import { CurrencyType } from '../../enums/currency-type.enum';
import { PaymentMethod } from '../../enums/payment-method.enum';

@Entity({ name: 'payment' })
export class Payment {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => Subscription, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @Column({ type: 'decimal', name: 'amount' })
  amount: number;

  @Column({ type: 'enum', enum: PaymentStatus, name: 'status' })
  status: PaymentStatus;

  @Column({
    type: 'enum',
    enum: CurrencyType,
    name: 'currency',
  })
  currency: CurrencyType;

  @Column({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'enum', enum: PaymentMethod, name: 'payment_method' })
  paymentMethod: PaymentMethod;

  @Column('uuid', { name: 'yookassa_payment_id', nullable: true })
  yookassaPaymentId: string;
}
