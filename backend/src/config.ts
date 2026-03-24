import { DocumentBuilder } from '@nestjs/swagger';

const config = {
    swagger: new DocumentBuilder()
    .setTitle('Clients and deals API')
    .setDescription('This API....')
    .setVersion('1.0')
    .addTag('Clients')
    .addTag('Deals')
    .build()
};

export default config;