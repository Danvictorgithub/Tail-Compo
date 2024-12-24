import { IsOptional, IsUrl, Length } from "class-validator";

export class CreateProfileDto {
    @Length(1, 128)
    name: string;
    @IsOptional()
    @IsUrl()
    image: string;
}
