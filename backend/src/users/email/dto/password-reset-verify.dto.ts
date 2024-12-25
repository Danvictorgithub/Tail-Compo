import { IsEmail, IsStrongPassword } from "class-validator";

export class PasswordResetVerifyDto {
    @IsStrongPassword()
    password: string;
}