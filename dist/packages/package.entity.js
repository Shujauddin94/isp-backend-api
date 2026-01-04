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
exports.Package = void 0;
const typeorm_1 = require("typeorm");
let Package = class Package {
    id;
    name;
    speed;
    monthlyPrice;
    threeMonthsPrice;
    yearlyPrice;
    features;
    penaltyRate;
    isPopular;
    isActive;
    createdAt;
    updatedAt;
};
exports.Package = Package;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Package.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Package.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Package.prototype, "speed", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { name: 'monthly_price', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Package.prototype, "monthlyPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { name: 'three_months_price', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Package.prototype, "threeMonthsPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { name: 'yearly_price', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Package.prototype, "yearlyPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Array)
], Package.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { name: 'penalty_rate', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Package.prototype, "penaltyRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_popular', default: false }),
    __metadata("design:type", Boolean)
], Package.prototype, "isPopular", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Package.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Package.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Package.prototype, "updatedAt", void 0);
exports.Package = Package = __decorate([
    (0, typeorm_1.Entity)('packages')
], Package);
//# sourceMappingURL=package.entity.js.map