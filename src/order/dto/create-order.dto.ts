import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'product' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  count: number;

  @ApiProperty({ example: 15000 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  summa: number;
}
