import { IsEmail, IsStrongPassword } from "class-validator";

export class PasswordResetDto {
    @IsEmail()
    email: string;
}