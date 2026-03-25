import { IsString, IsDate, IsInt, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DealStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  WON = 'WON',
  LOST = 'LOST',
}
   
export class DealsModel {
  @ApiProperty({ required: true })
  @IsString({ message: 'id must be a string' })
  @IsOptional()
  id?: string;

  @ApiProperty({ required: true })
  @IsString({ message: 'title must be a string' })
  title!: string;

  @ApiProperty({ required: true })
  @IsInt()
  amount!: number;

  @ApiProperty({ required: false })
  @IsIn(['NEW', 'IN_PROGRESS', 'WON', 'LOST'], {
    message: 'status must be one of predefined values',
  })
  status?: DealStatus;

  @ApiProperty({ required: true })
  @IsString()
  client!: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}

export class ParamsModel {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ required: true })
  @IsString()
  clientId!: string;
}