import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsStrongPassword,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @Length(4, 32)
  @Transform(({ value }) => value.toLowerCase())
  username: string;
  @Length(4, 128)
  name: string;
  @IsStrongPassword()
  password: string;
  @IsOptional()
  @IsUrl()
  image: string;
}
