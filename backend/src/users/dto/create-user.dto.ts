import { IsEmail, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @Length(4, 32)
    username: string;
    @Length(4, 32)
    name: string;
    @IsOptional()
    @IsStrongPassword()
    password: string
    @IsOptional()
    image: string;
}

