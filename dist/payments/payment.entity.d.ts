import { Subscription } from '../subscriptions/subscription.entity';
export declare enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    OVERDUE = "overdue",
    FAILED = "failed",
    PARTIALLY_PAID = "partially_paid"
}
export declare class Payment {
    id: string;
    subscriptionId: string;
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
    penaltyAmount: number;
    status: PaymentStatus;
    dueDate: Date;
    paidAt: Date | null;
    transactionId: string | null;
    createdAt: Date;
    updatedAt: Date;
    subscription: Subscription;
}
