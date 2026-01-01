import { Subscription } from '../subscriptions/subscription.entity';
export declare class Customer {
    id: string;
    fullName: string;
    cnicPassport: string;
    mobileNumber: string;
    email: string;
    address: string;
    homeAddress: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    subscriptions: Subscription[];
}
