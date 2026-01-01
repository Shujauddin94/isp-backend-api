import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    findAll(): Promise<import("./payment.entity").Payment[]>;
    markAsPaid(id: string): Promise<import("./payment.entity").Payment>;
}
