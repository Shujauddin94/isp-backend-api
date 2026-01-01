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
            id: uuidv4(),
            ...createSubscriptionDto,
            price,
            startDate: new Date(),
            nextDueDate,
        });

        const savedSubscription = await this.subscriptionsRepository.save(subscription);

        // Create initial payment
        await this.paymentsService.create({
            subscriptionId: savedSubscription.id,
            amount: price,
            dueDate: nextDueDate,
        });

        return savedSubscription;
    }

    async findAll(): Promise<Subscription[]> {
        return await this.subscriptionsRepository.find({
            relations: ['customer', 'package', 'payments'],
        });
    }

    async findByCustomer(customerId: string): Promise<Subscription[]> {
        return await this.subscriptionsRepository.find({
            where: { customerId },
            relations: ['package', 'payments'],
        });
    }
}
