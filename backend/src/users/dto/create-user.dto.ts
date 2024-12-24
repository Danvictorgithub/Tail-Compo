import { Transform } from "class-transformer";
import { IsEmail, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @Length(4, 32)
    @Transform(({ value }) => value.toLowerCase())
    username: string;
    @Length(4, 32)
    name: string;
    @IsStrongPassword()
    password: string
    @IsOptional()
    image: string;
}

