"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const index_module_1 = require("./routes/index.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = __importDefault(require("./config"));
const embedded_postgres_1 = __importDefault(require("embedded-postgres"));
const fs_1 = require("fs");
const path_1 = require("path");
async function app() {
    var _a;
    const dbPath = (0, path_1.join)(process.cwd(), './data/db');
    const pidFile = (0, path_1.join)(dbPath, 'postmaster.pid');
    const pgDb = new embedded_postgres_1.default({
        databaseDir: dbPath,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
    try {
        if (!(0, fs_1.existsSync)(dbPath)) {
            console.log("⏳ Initialising database for the first time...");
            await pgDb.initialise();
        }
        if ((0, fs_1.existsSync)(pidFile)) {
            try {
                (0, fs_1.unlinkSync)(pidFile);
                console.log('🧹 Cleaned up old postmaster.pid');
            }
            catch (e) {
                console.log('⚠️ Could not remove pid file, it might be in use');
            }
        }
        await pgDb.start();
        console.log('🚀 Local PostgreSQL started');
    }
    catch (err) {
        console.error('Failed to start Postgres: ', err);
    }
    const app = await core_1.NestFactory.create(index_module_1.AppRouter);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const document = swagger_1.SwaggerModule.createDocument(app, config_1.default.swagger);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
    await app.listen(port, () => console.log(`Test CI/CD. Server runs on the port ${port}.`));
}
app();
//# sourceMappingURL=app.js.map