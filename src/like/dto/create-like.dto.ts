import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLikeDto {

    @ApiProperty({example:"11121212454"})
    @IsNotEmpty()
    @IsString()
    productId:string
}
