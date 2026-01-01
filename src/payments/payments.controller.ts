import { Controller, Get, Patch, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Get()
    findAll() {
        return this.paymentsService.findAll();
    }

    @Patch(':id/mark-paid')
    markAsPaid(@Param('id') id: string) {
        return this.paymentsService.markAsPaid(id);
    }
}
