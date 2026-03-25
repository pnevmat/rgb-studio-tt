import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Deal} from '../../dbEntities/deal.entity';
import { DealsController } from '../../controllers/deals/deals.controller';
import { DealsService } from '../../services/deals/deals.services';

@Module({
    imports: [TypeOrmModule.forFeature([Deal])],
    controllers: [DealsController],
    providers: [DealsService],
})

export class DealsRouter {}