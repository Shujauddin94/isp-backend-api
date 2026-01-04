import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Get()
    findAll() {
        return this.paymentsService.findAll();
    }

    @Patch(':id/pay')
    recordPayment(@Param('id') id: string, @Body('amount') amount: number) {
        return this.paymentsService.recordPayment(id, amount);
    }
}
