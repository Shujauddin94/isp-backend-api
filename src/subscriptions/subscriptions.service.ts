import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription, PaymentCycle } from './subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PaymentsService } from '../payments/payments.service';
import { PackagesService } from '../packages/packages.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(Subscription)
        private subscriptionsRepository: Repository<Subscription>,
        private packagesService: PackagesService,
        private paymentsService: PaymentsService,
    ) { }

    async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
        const pkg = await this.packagesService.findOne(createSubscriptionDto.packageId);

        let price: number;
        let nextDueDate = new Date();

        switch (createSubscriptionDto.paymentCycle) {
            case PaymentCycle.MONTHLY:
                price = pkg.monthlyPrice;
                nextDueDate.setMonth(nextDueDate.getMonth() + 1);
                break;
            case PaymentCycle.THREE_MONTHS:
                price = pkg.threeMonthsPrice;
                nextDueDate.setMonth(nextDueDate.getMonth() + 3);
                break;
            case PaymentCycle.YEARLY:
                price = pkg.yearlyPrice;
                nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
                break;
        }

        const subscription = this.subscriptionsRepository.create({
            ...createSubscriptionDto,
            price,
            startDate: new Date(),
            nextDueDate,
        });

        const savedSubscription = await this.subscriptionsRepository.save(subscription);

        // Create initial payment - due in 3 days
        const paymentDueDate = new Date();
        paymentDueDate.setDate(paymentDueDate.getDate() + 3);

        await this.paymentsService.create({
            subscriptionId: savedSubscription.id,
            totalAmount: price,
            dueDate: paymentDueDate,
        });

        return savedSubscription;
    }

    async findAll(): Promise<Subscription[]> {
        return await this.subscriptionsRepository.find({
            relations: ['customer', 'package', 'payments'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Subscription> {
        const sub = await this.subscriptionsRepository.findOne({
            where: { id },
            relations: ['customer', 'package', 'payments'],
        });
        if (!sub) throw new Error('Subscription not found');
        return sub;
    }

    async update(id: string, updateDto: Partial<CreateSubscriptionDto>): Promise<Subscription> {
        const currentSub = await this.findOne(id);
        const pkgId = updateDto.packageId || currentSub.packageId;
        const cycle = updateDto.paymentCycle || currentSub.paymentCycle;

        if (updateDto.packageId || updateDto.paymentCycle) {
            const pkg = await this.packagesService.findOne(pkgId);
            let price: number = currentSub.price;

            switch (cycle) {
                case PaymentCycle.MONTHLY:
                    price = pkg.monthlyPrice;
                    break;
                case PaymentCycle.THREE_MONTHS:
                    price = pkg.threeMonthsPrice;
                    break;
                case PaymentCycle.YEARLY:
                    price = pkg.yearlyPrice;
                    break;
            }
            (updateDto as any).price = price;
        }

        await this.subscriptionsRepository.update(id, updateDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.subscriptionsRepository.delete(id);
    }

    async findByCustomer(customerId: string): Promise<Subscription[]> {
        return await this.subscriptionsRepository.find({
            where: { customerId },
            relations: ['package', 'payments'],
            order: { createdAt: 'DESC' },
        });
    }
}
