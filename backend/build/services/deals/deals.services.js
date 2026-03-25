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
exports.DealsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const deal_entity_1 = require("../../dbEntities/deal.entity");
const uuid_1 = require("uuid");
let DealsService = class DealsService {
    constructor(deals) {
        this.deals = deals;
    }
    async createOne(deal) {
        const newDeal = this.deals.create({ id: (0, uuid_1.v4)(), ...deal });
        return await this.deals.save(newDeal);
    }
    async getAll(params) {
        const { clientId, status } = params;
        if (!clientId)
            throw new common_1.NotFoundException('Client id is required');
        const [deals, total] = await this.deals.findAndCount({
            where: {
                client: clientId
            },
            order: { createdAt: 'DESC' },
        });
        if (!status)
            return { deals, total };
        return { deals: deals.filter(deal => deal.status === status), total };
    }
    async getOne(id) {
        const deal = await this.deals.findOne({
            where: { id },
            relations: ['clients']
        });
        if (!deal)
            throw new common_1.NotFoundException('Deal not found');
        return deal;
    }
    async updateOne(id, data) {
        const deal = await this.deals.preload({
            id: id,
            ...data,
        });
        if (!deal)
            throw new common_1.NotFoundException('Deal does not exist');
        return await this.deals.save(deal);
    }
    async deleteOne(id) {
        const deal = await this.getOne(id);
        if (!deal)
            throw new common_1.NotFoundException('Deal does not exist');
        await this.deals.remove(deal);
        return deal;
    }
};
exports.DealsService = DealsService;
exports.DealsService = DealsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(deal_entity_1.Deal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DealsService);
//# sourceMappingURL=deals.services.js.map