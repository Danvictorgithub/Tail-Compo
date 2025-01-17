import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { DevelopmentGuard } from 'src/guards/development/development.guard';
import { JwtAuthGuard } from 'src/authentication/passport-strategies/jwt/jwt.auth.guard';
import { UserSelfGuard } from 'src/guards/user-self/user-self.guard';
import { RequestUser } from 'src/interfaces/requestUser';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.MulterS3.File,
  ) {
    return this.usersService.create(createUserDto, file);
  }

  @UseGuards(DevelopmentGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  @UseGuards(JwtAuthGuard, UserSelfGuard)
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ skipUndefinedProperties: true }))
    updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.MulterS3.File,
    @Request() req: RequestUser,
  ) {
    console.log(updateUserDto);
    return this.usersService.update(id, updateUserDto, file, req.user);
  }

  @UseGuards(DevelopmentGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
