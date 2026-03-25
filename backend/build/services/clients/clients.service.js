"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let ClientsService = class ClientsService {
    constructor() {
        this.clients = [];
    }
    async createOne(client) {
        const newClient = { id: (0, uuid_1.v4)(), ...client };
        this.clients.push(newClient);
        return newClient;
    }
    async getAll(params) {
        const { page, limit } = params;
        const defaultLimit = 5;
        if (!page && !limit)
            return { clients: this.clients, total: this.clients.length };
        if (!page)
            return { clients: this.clients.filter((client, i) => i < Number(limit)), total: this.clients.length };
        if (!limit)
            return {
                clients: this.clients.filter((client, i) => i > (Number(page) - 1) * defaultLimit && i < Number(page) * defaultLimit),
                total: this.clients.length
            };
        return {
            clients: this.clients.filter((client, i) => i > (Number(page) - 1) * Number(limit) && i < Number(page) * Number(limit)),
            total: this.clients.length
        };
    }
    getOne(id) {
        const client = this.clients.find(client => client.id === id);
        if (!client)
            return 'Client not found';
        return client;
    }
    updateOne(id, data) {
        const client = this.clients.find(client => client.id === id);
        if (!client)
            return 'Client does not exist';
        const newClient = { ...client, ...data };
        this.clients[this.clients.indexOf(client)] = newClient;
        return newClient;
    }
    deleteOne(id) {
        const client = this.clients.find(client => client.id === id);
        if (!client)
            return 'Client does not exist';
        this.clients.splice(this.clients.indexOf(client), 1);
        return client;
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)()
], ClientsService);
//# sourceMappingURL=clients.service.js.map