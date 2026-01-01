import { PaymentCycle } from '../subscription.entity';
export declare class CreateSubscriptionDto {
    customerId: string;
    packageId: string;
    paymentCycle: PaymentCycle;
}
