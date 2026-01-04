import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
export declare class PaymentsService {
    private paymentsRepository;
    constructor(paymentsRepository: Repository<Payment>);
    create(data: {
        subscriptionId: string;
        totalAmount: number;
        dueDate: Date;
    }): Promise<Payment>;
    recordPayment(id: string, paidAmount: number): Promise<Payment>;
    updateOverduePayments(): Promise<void>;
    findAll(): Promise<Payment[]>;
}
