"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const common_1 = require("@nestjs/common");
const clients_module_1 = require("./clients/clients.module");
const deals_module_1 = require("./deals/deals.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const client_entity_1 = require("../dbEntities/client.entity");
const deal_entity_1 = require("../dbEntities/deal.entity");
const EnvConfig = config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: `${process.cwd()}/.env` });
const TypeOrmDbConfig = typeorm_1.TypeOrmModule.forRoot({
    type: 'postgres',
    host: '127.0.0.1',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
    autoLoadEntities: true,
    entities: [client_entity_1.Client, deal_entity_1.Deal],
    synchronize: true,
});
let AppRouter = class AppRouter {
};
exports.AppRouter = AppRouter;
exports.AppRouter = AppRouter = __decorate([
    (0, common_1.Module)({
        imports: [EnvConfig, TypeOrmDbConfig, clients_module_1.ClientsRouter, deals_module_1.DealsRouter],
    })
], AppRouter);
//# sourceMappingURL=index.module.js.map