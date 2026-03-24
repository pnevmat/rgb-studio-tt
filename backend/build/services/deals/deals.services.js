"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let DealsService = class DealsService {
    constructor() {
        this.deals = [];
    }
    async createOne(deal) {
        const newDeal = { id: (0, uuid_1.v4)(), ...deal };
        this.deals.push(newDeal);
        return newDeal;
    }
    async getAll(params) {
        const { clientId, status } = params;
        if (!clientId)
            return 'Client id is required';
        const filteredDeals = this.deals.filter(deal => deal.client === clientId);
        if (!status)
            return filteredDeals;
        return filteredDeals.filter(deal => deal.status === status);
    }
    async updateOne(id, data) {
        const deal = this.deals.find(deal => deal.id === id);
        if (!deal)
            return 'Deal does not exist';
        const newDeal = { ...deal, ...data };
        this.deals[this.deals.indexOf(deal)] = newDeal;
        return newDeal;
    }
    async deleteOne(id) {
        const deal = this.deals.find(client => client.id === id);
        if (!deal)
            return 'Deal does not exist';
        this.deals.splice(this.deals.indexOf(deal), 1);
        return deal;
    }
};
exports.DealsService = DealsService;
exports.DealsService = DealsService = __decorate([
    (0, common_1.Injectable)()
], DealsService);
//# sourceMappingURL=deals.services.js.map