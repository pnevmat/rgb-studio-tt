"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const config = {
    swagger: new swagger_1.DocumentBuilder()
        .setTitle('Clients and deals API')
        .setDescription('This API....')
        .setVersion('1.0')
        .addTag('Clients')
        .addTag('Deals')
        .build()
};
exports.default = config;
//# sourceMappingURL=config.js.map