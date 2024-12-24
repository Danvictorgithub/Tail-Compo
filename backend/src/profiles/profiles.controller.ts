import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/authentication/passport-strategies/jwt/jwt.auth.guard';
import { RequestUser } from 'src/interfaces/requestUser';
import { FileInterceptor } from '@nestjs/platform-express';
import { DevelopmentGuard } from 'src/guards/development/development.guard';
import { ProfileOwnerGuard } from 'src/guards/profile-owner/profile-owner.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body(
    ) createProfileDto: CreateProfileDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ fileType: 'image/*' })]
      }))
    file: Express.MulterS3.File,
    @Request() req: RequestUser) {
    return this.profilesService.create(createProfileDto, file, req.user);
  }

  @UseGuards(DevelopmentGuard)
  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard, ProfileOwnerGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        skipUndefinedProperties: true
      })) updateProfileDto: UpdateProfileDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ fileType: 'image/*' })]
      }))
    file: Express.MulterS3.File,
    @Request() req: RequestUser
  ) {
    return this.profilesService.update(id, updateProfileDto, file, req.user);
  }

  @UseGuards(DevelopmentGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }
}
