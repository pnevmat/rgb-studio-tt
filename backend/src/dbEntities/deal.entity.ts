import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne 
} from 'typeorm';
import { Client } from './client.entity';
import {DealStatus} from '../models/deals.dto';

@Entity('deals')
export class Deal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column({
    type: 'enum',
    enum: DealStatus,
    default: DealStatus.NEW,
  })
  status!: DealStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Client, (client) => client.deals, { onDelete: 'CASCADE' })
  client!: string;
}