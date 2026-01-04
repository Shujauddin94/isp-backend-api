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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./payment.entity");
let PaymentsService = class PaymentsService {
    paymentsRepository;
    constructor(paymentsRepository) {
        this.paymentsRepository = paymentsRepository;
    }
    async create(data) {
        const payment = this.paymentsRepository.create({
            ...data,
            status: payment_entity_1.PaymentStatus.PENDING,
        });
        return await this.paymentsRepository.save(payment);
    }
    async recordPayment(id, paidAmount) {
        const payment = await this.paymentsRepository.findOne({
            where: { id },
            relations: ['subscription', 'subscription.package'],
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        const now = new Date();
        let penaltyAmount = 0;
        if (now > payment.dueDate && payment.status === payment_entity_1.PaymentStatus.PENDING) {
            const penaltyRate = payment.subscription.package.penaltyRate || 0;
            penaltyAmount = (Number(payment.totalAmount) * penaltyRate) / 100;
        }
        const totalDue = Number(payment.totalAmount) + penaltyAmount;
        const newPaidAmount = Number(payment.paidAmount) + paidAmount;
        let status = payment_entity_1.PaymentStatus.PARTIALLY_PAID;
        if (newPaidAmount >= totalDue) {
            status = payment_entity_1.PaymentStatus.PAID;
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
            throw new common_1.NotFoundException(`Payment with ID ${id} not found after update`);
        }
        return updatedPayment;
    }
    async updateOverduePayments() {
        await this.paymentsRepository.update({
            status: payment_entity_1.PaymentStatus.PENDING,
            dueDate: (0, typeorm_2.LessThan)(new Date()),
        }, { status: payment_entity_1.PaymentStatus.OVERDUE });
    }
    async findAll() {
        return await this.paymentsRepository.find({
            relations: ['subscription', 'subscription.customer', 'subscription.package'],
            order: { dueDate: 'DESC' },
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map