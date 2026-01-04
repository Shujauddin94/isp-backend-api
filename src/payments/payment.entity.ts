import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Subscription } from '../subscriptions/subscription.entity';

export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    OVERDUE = 'overdue',
    FAILED = 'failed',
    PARTIALLY_PAID = 'partially_paid',
}

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'subscription_id' })
    subscriptionId: string;

    @Column('decimal', { name: 'total_amount', precision: 10, scale: 2 })
    totalAmount: number;

    @Column('decimal', { name: 'paid_amount', precision: 10, scale: 2, default: 0 })
    paidAmount: number;

    @Column({ type: 'decimal', name: 'pending_amount', precision: 10, scale: 2, insert: false, update: false })
    pendingAmount: number;

    @Column('decimal', { name: 'penalty_amount', precision: 10, scale: 2, default: 0 })
    penaltyAmount: number;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    })
    status: PaymentStatus;

    @Column({ name: 'due_date', type: 'timestamp with time zone' })
    dueDate: Date;

    @Column({ name: 'paid_at', type: 'timestamp with time zone', nullable: true })
    paidAt: Date | null;

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
