import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsEmpty, IsEnum, IsInt, IsIP, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";


export class CreateUserDto {
    @ApiProperty({ example: "Ali", description: "Foydalanuvchining ismi" })
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({ example: "Valiyev", description: "Foydalanuvchining familiyasi" })
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty({ example: "ali@example.com", description: "Foydalanuvchining elektron pochtasi" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "+998901234567", description: "Foydalanuvchining telefon raqami" })
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty({ example: "StrongPass123!", description: "Foydalanuvchining paroli" })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: "https://example.com/image.jpg", description: "Profil rasmi URL manzili" })
    @IsOptional()
    @IsString()
    image?: string[];

    @ApiProperty({ example: Role.USER, description: "Foydalanuvchi roli" })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @ApiProperty({ example: 1, description: "Hudud ID raqami" })
    @IsOptional()
    @IsString()
    regionId?: string;

    @ApiProperty({ example: "Toshkent", description: "Foydalanuvchining yashash joyi" })
    @IsOptional()
    @IsString()
    location?: string;
}


export class loginUserDto {
    @ApiProperty({ example: "ali@example.com", description: "Foydalanuvchi email manzili" })
    @IsEmail({}, { message: "Invalid email format" })
    @IsNotEmpty({ message: "Email is required" })
    email: string;

    @ApiProperty({ example: "1234", description: "Foydalanuvchi paroli" })
    @IsString()
    @IsNotEmpty({ message: "Password is required" })
    password: string;

    @ApiProperty({ example: '222.666.22' })
    ip: string;

    }



    
export class SessionDto {
    @IsString()
    @IsNotEmpty()
    @IsIP()
    ip: string;
}


export class SendOtpDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  }