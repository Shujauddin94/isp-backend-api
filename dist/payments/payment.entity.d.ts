import { Subscription } from '../subscriptions/subscription.entity';
export declare enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    OVERDUE = "overdue",
    FAILED = "failed"
}
export declare class Payment {
    id: string;
    subscriptionId: string;
    amount: number;
    status: PaymentStatus;
    dueDate: Date;
    paidDate: Date | null;
    transactionId: string | null;
    createdAt: Date;
    updatedAt: Date;
    subscription: Subscription;
}
