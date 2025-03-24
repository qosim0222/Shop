import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCommentDto {
    @ApiProperty({ example: "juda zo'r" })
    @IsString()
    @IsNotEmpty()
    text: string

    @ApiProperty({ example: 5 })
    @IsNumber()
    @IsNotEmpty()
    stars: number

    @ApiProperty({ example: "1356564445455" })
    @IsString()
    productId: string
}
