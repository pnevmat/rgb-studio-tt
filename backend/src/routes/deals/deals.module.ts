import { Module } from '@nestjs/common';
import { DealsController } from '../../controllers/deals/deals.controller';
import { DealsService } from '../../services/deals/deals.services';

@Module({
    controllers: [DealsController],
    providers: [DealsService],
})

export class DealsRouter {}