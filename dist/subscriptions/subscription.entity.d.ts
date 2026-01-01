import { Customer } from '../customers/customer.entity';
import { Package } from '../packages/package.entity';
import { Payment } from '../payments/payment.entity';
export declare enum PaymentCycle {
    MONTHLY = "monthly",
    THREE_MONTHS = "three_months",
    YEARLY = "yearly"
}
export declare enum SubscriptionStatus {
    ACTIVE = "active",
    SUSPENDED = "suspended",
    CANCELLED = "cancelled"
}
export declare class Subscription {
    id: string;
    customerId: string;
    packageId: string;
    paymentCycle: PaymentCycle;
    status: SubscriptionStatus;
    price: number;
    startDate: Date;
    nextDueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    customer: Customer;
    package: Package;
    payments: Payment[];
}
