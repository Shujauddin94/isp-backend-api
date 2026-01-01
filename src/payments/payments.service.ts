import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Payment, PaymentStatus } from './payment.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private paymentsRepository: Repository<Payment>,
    ) { }

    async create(data: {
        subscriptionId: string;
        amount: number;
        dueDate: Date;
    }): Promise<Payment> {
        const payment = this.paymentsRepository.create({
            id: uuidv4(),
            ...data,
            status: PaymentStatus.PENDING,
        });
        return await this.paymentsRepository.save(payment);
    }

    async markAsPaid(id: string): Promise<Payment> {
        await this.paymentsRepository.update(id, {
            status: PaymentStatus.PAID,
            paidDate: new Date(),
            transactionId: `TXN-${Date.now()}`,
        });
        const payment = await this.paymentsRepository.findOne({ where: { id } });
        if (!payment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }

    async updateOverduePayments(): Promise<void> {
        await this.paymentsRepository.update(
            {
                status: PaymentStatus.PENDING,
                dueDate: LessThan(new Date()),
            },
            { status: PaymentStatus.OVERDUE },
        );
    }

    async findAll(): Promise<Payment[]> {
        return await this.paymentsRepository.find({
            relations: ['subscription'],
            order: { dueDate: 'DESC' },
        });
    }
}
