import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Subscription } from '../subscriptions/subscription.entity';

export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    OVERDUE = 'overdue',
    FAILED = 'failed',
}

@Entity('payments')
export class Payment {
    @PrimaryColumn('varchar', { length: 36 })
    id: string;

    @Column({ name: 'subscription_id' })
    subscriptionId: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    })
    status: PaymentStatus;

    @Column({ name: 'due_date', type: 'timestamp' })
    dueDate: Date;

    @Column({ name: 'paid_date', type: 'timestamp', nullable: true })
    paidDate: Date | null;

    @Column('varchar', { name: 'transaction_id', length: 100, nullable: true })
    transactionId: string | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Subscription, subscription => subscription.payments)
    @JoinColumn({ name: 'subscription_id' })
    subscription: Subscription;
}
