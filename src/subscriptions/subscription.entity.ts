import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { Package } from '../packages/package.entity';
import { Payment } from '../payments/payment.entity';

export enum PaymentCycle {
    MONTHLY = 'monthly',
    THREE_MONTHS = 'three_months',
    YEARLY = 'yearly',
}

export enum SubscriptionStatus {
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
    CANCELLED = 'cancelled',
}

@Entity('subscriptions')
export class Subscription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'customer_id' })
    customerId: string;

    @Column({ name: 'package_id' })
    packageId: string;

    @Column({
        type: 'enum',
        enum: PaymentCycle,
        name: 'payment_cycle',
    })
    paymentCycle: PaymentCycle;

    @Column({
        type: 'enum',
        enum: SubscriptionStatus,
        default: SubscriptionStatus.ACTIVE,
    })
    status: SubscriptionStatus;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ name: 'start_date', type: 'timestamp' })
    startDate: Date;

    @Column({ name: 'next_due_date', type: 'timestamp' })
    nextDueDate: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Customer, customer => customer.subscriptions)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => Package)
    @JoinColumn({ name: 'package_id' })
    package: Package;

    @OneToMany(() => Payment, payment => payment.subscription)
    payments: Payment[];
}
