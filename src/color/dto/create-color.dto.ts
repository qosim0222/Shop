import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateColorDto {
    @ApiProperty({example:"color"})
    @IsString()
    @IsNotEmpty()
    name:string

}
