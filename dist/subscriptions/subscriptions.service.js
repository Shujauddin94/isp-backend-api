"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subscription_entity_1 = require("./subscription.entity");
const payments_service_1 = require("../payments/payments.service");
const packages_service_1 = require("../packages/packages.service");
let SubscriptionsService = class SubscriptionsService {
    subscriptionsRepository;
    packagesService;
    paymentsService;
    constructor(subscriptionsRepository, packagesService, paymentsService) {
        this.subscriptionsRepository = subscriptionsRepository;
        this.packagesService = packagesService;
        this.paymentsService = paymentsService;
    }
    async create(createSubscriptionDto) {
        const pkg = await this.packagesService.findOne(createSubscriptionDto.packageId);
        let price;
        let nextDueDate = new Date();
        switch (createSubscriptionDto.paymentCycle) {
            case subscription_entity_1.PaymentCycle.MONTHLY:
                price = pkg.monthlyPrice;
                nextDueDate.setMonth(nextDueDate.getMonth() + 1);
                break;
            case subscription_entity_1.PaymentCycle.THREE_MONTHS:
                price = pkg.threeMonthsPrice;
                nextDueDate.setMonth(nextDueDate.getMonth() + 3);
                break;
            case subscription_entity_1.PaymentCycle.YEARLY:
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
        const paymentDueDate = new Date();
        paymentDueDate.setDate(paymentDueDate.getDate() + 3);
        await this.paymentsService.create({
            subscriptionId: savedSubscription.id,
            totalAmount: price,
            dueDate: paymentDueDate,
        });
        return savedSubscription;
    }
    async findAll() {
        return await this.subscriptionsRepository.find({
            relations: ['customer', 'package', 'payments'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const sub = await this.subscriptionsRepository.findOne({
            where: { id },
            relations: ['customer', 'package', 'payments'],
        });
        if (!sub)
            throw new Error('Subscription not found');
        return sub;
    }
    async update(id, updateDto) {
        const currentSub = await this.findOne(id);
        const pkgId = updateDto.packageId || currentSub.packageId;
        const cycle = updateDto.paymentCycle || currentSub.paymentCycle;
        if (updateDto.packageId || updateDto.paymentCycle) {
            const pkg = await this.packagesService.findOne(pkgId);
            let price = currentSub.price;
            switch (cycle) {
                case subscription_entity_1.PaymentCycle.MONTHLY:
                    price = pkg.monthlyPrice;
                    break;
                case subscription_entity_1.PaymentCycle.THREE_MONTHS:
                    price = pkg.threeMonthsPrice;
                    break;
                case subscription_entity_1.PaymentCycle.YEARLY:
                    price = pkg.yearlyPrice;
                    break;
            }
            updateDto.price = price;
        }
        await this.subscriptionsRepository.update(id, updateDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.subscriptionsRepository.delete(id);
    }
    async findByCustomer(customerId) {
        return await this.subscriptionsRepository.find({
            where: { customerId },
            relations: ['package', 'payments'],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        packages_service_1.PackagesService,
        payments_service_1.PaymentsService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map