import { IsString, IsEmail, IsDate, IsInt, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
   
export class ClientsModel {
  @ApiProperty({ required: true })
  @IsString({ message: 'name must be a string' })
  name!: string;

  @ApiProperty({ required: true })
  @IsEmail({}, { message: 'Email is not correct' })
  email!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

export class ParamsModel {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  page?: string;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  limit?: string;
}