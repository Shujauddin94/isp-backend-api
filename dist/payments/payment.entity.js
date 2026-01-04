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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.PaymentStatus = void 0;
const typeorm_1 = require("typeorm");
const subscription_entity_1 = require("../subscriptions/subscription.entity");
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PAID"] = "paid";
    PaymentStatus["OVERDUE"] = "overdue";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["PARTIALLY_PAID"] = "partially_paid";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
let Payment = class Payment {
    id;
    subscriptionId;
    totalAmount;
    paidAmount;
    pendingAmount;
    penaltyAmount;
    status;
    dueDate;
    paidAt;
    transactionId;
    createdAt;
    updatedAt;
    subscription;
};
exports.Payment = Payment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subscription_id' }),
    __metadata("design:type", String)
], Payment.prototype, "subscriptionId", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { name: 'total_amount', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Payment.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { name: 'paid_amount', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payment.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: 'pending_amount', precision: 10, scale: 2, insert: false, update: false }),
    __metadata("design:type", Number)
], Payment.prototype, "pendingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { name: 'penalty_amount', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payment.prototype, "penaltyAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'due_date', type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Payment.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paid_at', type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Object)
], Payment.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'transaction_id', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Payment.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Payment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Payment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subscription_entity_1.Subscription, subscription => subscription.payments),
    (0, typeorm_1.JoinColumn)({ name: 'subscription_id' }),
    __metadata("design:type", subscription_entity_1.Subscription)
], Payment.prototype, "subscription", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)('payments')
], Payment);
//# sourceMappingURL=payment.entity.js.map