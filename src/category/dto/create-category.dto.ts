import { Type } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ example: "s21" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: "PHONE",  enum: Type })
    @IsEnum(Type)
    type: Type;
}
