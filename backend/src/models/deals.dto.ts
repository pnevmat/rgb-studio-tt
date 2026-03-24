import { IsString, IsInt, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
   
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
  status?: string;

  @ApiProperty({ required: true })
  @IsString()
  client!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  updatedAt?: string;
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