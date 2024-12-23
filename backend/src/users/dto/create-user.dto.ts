import { IsEmail, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @IsString()
    username: string;
    @Length(4, 32)
    name: string;
    @IsStrongPassword()
    password: string
    @IsOptional()
    image: string;
}

