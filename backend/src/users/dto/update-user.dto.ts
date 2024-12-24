import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsStrongPassword, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    @Length(4, 32)
    username?: string;

    @IsOptional()
    @IsStrongPassword()
    password?: string;

    @Exclude()
    name?: string;
    @Exclude()
    image?: string;
    @Exclude()
    email?: string;
}