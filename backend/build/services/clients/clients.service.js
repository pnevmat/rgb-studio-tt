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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("../../dbEntities/client.entity");
let ClientsService = class ClientsService {
    constructor(clients) {
        this.clients = clients;
    }
    async createOne(client) {
        const existingClient = await this.clients.findOne({
            where: { email: client.email }
        });
        if (existingClient)
            throw new common_1.ConflictException('Client already exist');
        // id: uuidv4(), 
        const newClient = this.clients.create({ ...client });
        return await this.clients.save(newClient);
    }
    async getAll(params) {
        const page = Number(params.page) || 1;
        const limit = Number(params.limit) || 5;
        const [clients, total] = await this.clients.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        return { clients, total };
    }
    async getOne(id) {
        const client = await this.clients.findOne({
            where: { id },
            relations: ['deals']
        });
        if (!client)
            throw new common_1.NotFoundException('Client not found');
        return client;
    }
    async updateOne(id, data) {
        const client = await this.clients.preload({
            id: id,
            ...data,
        });
        if (!client)
            throw new common_1.NotFoundException('Client does not exist');
        return await this.clients.save(client);
    }
    async deleteOne(id) {
        const client = await this.getOne(id);
        if (!client)
            throw new common_1.NotFoundException('Client does not exist');
        await this.clients.remove(client);
        return client;
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientsService);
//# sourceMappingURL=clients.service.js.map