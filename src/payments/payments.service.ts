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
        totalAmount: number;
        dueDate: Date;
    }): Promise<Payment> {
        const payment = this.paymentsRepository.create({
            ...data,
            status: PaymentStatus.PENDING,
        });
        return await this.paymentsRepository.save(payment);
    }

    async recordPayment(id: string, paidAmount: number): Promise<Payment> {
        const payment = await this.paymentsRepository.findOne({
            where: { id },
            relations: ['subscription', 'subscription.package'],
        });

        if (!payment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }

        const now = new Date();
        let penaltyAmount = 0;

        // Calculate penalty if overdue
        if (now > payment.dueDate && payment.status === PaymentStatus.PENDING) {
            const penaltyRate = payment.subscription.package.penaltyRate || 0;
            penaltyAmount = (Number(payment.totalAmount) * penaltyRate) / 100;
        }

        const totalDue = Number(payment.totalAmount) + penaltyAmount;
        const newPaidAmount = Number(payment.paidAmount) + paidAmount;

        let status = PaymentStatus.PARTIALLY_PAID;
        if (newPaidAmount >= totalDue) {
            status = PaymentStatus.PAID;
        }

        await this.paymentsRepository.update(id, {
            paidAmount: newPaidAmount,
            penaltyAmount: penaltyAmount,
            status: status,
            paidAt: now,
            transactionId: `TXN-${Date.now()}`,
        });

        const updatedPayment = await this.paymentsRepository.findOne({ where: { id } });
        if (!updatedPayment) {
            throw new NotFoundException(`Payment with ID ${id} not found after update`);
        }
        return updatedPayment;
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
            relations: ['subscription', 'subscription.customer', 'subscription.package'],
            order: { dueDate: 'DESC' },
        });
    }
}
