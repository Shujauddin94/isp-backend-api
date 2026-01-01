import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
export declare class PaymentsService {
    private paymentsRepository;
    constructor(paymentsRepository: Repository<Payment>);
    create(data: {
        subscriptionId: string;
        amount: number;
        dueDate: Date;
    }): Promise<Payment>;
    markAsPaid(id: string): Promise<Payment>;
    updateOverduePayments(): Promise<void>;
    findAll(): Promise<Payment[]>;
}
