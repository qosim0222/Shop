import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Condition, TradeType, StatusProduct } from '@prisma/client';

export class CreateProductDto {
  @ApiProperty({ example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'], required: false })
  @IsArray()
  @IsOptional()
  image?: string[];

  @ApiProperty({ example: 'Smartphone XYZ' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'color' })
  @IsNotEmpty()
  @IsArray()
  colorItem: string[];


  @ApiProperty({ example: 599.99 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 650.00, required: false })
  @IsNumber()
  @IsOptional()
  ceiling?: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  count: number;

  @ApiProperty({ example: 'High-quality smartphone with great features' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'New York, USA' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ example: Condition.NEW, enum: Condition })
  @IsEnum(Condition)
  condition: Condition;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  bargain?: boolean;

  @ApiProperty({ example: TradeType.PAID, enum: TradeType, required: false })
  @IsEnum(TradeType)
  @IsOptional()
  trade_type?: TradeType;

  @ApiProperty({ example: StatusProduct.PENDING, enum: StatusProduct, required: false })
  @IsEnum(StatusProduct)
  @IsOptional()
  status?: StatusProduct;

  @ApiProperty({ example: 'c12345-abcd-67890-xyz' })
  @IsString()
  categoryId: string;
}


export class ActiveProductDto {
    @IsNotEmpty()
    @IsString()
    productId: string;
  }
