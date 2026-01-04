import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PaymentsService } from '../payments/payments.service';
import { PackagesService } from '../packages/packages.service';
export declare class SubscriptionsService {
    private subscriptionsRepository;
    private packagesService;
    private paymentsService;
    constructor(subscriptionsRepository: Repository<Subscription>, packagesService: PackagesService, paymentsService: PaymentsService);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription>;
    findAll(): Promise<Subscription[]>;
    findOne(id: string): Promise<Subscription>;
    update(id: string, updateDto: Partial<CreateSubscriptionDto>): Promise<Subscription>;
    remove(id: string): Promise<void>;
    findByCustomer(customerId: string): Promise<Subscription[]>;
}
