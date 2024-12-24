import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import * as argon from "argon2"
import { ProfilesService } from 'src/profiles/profiles.service';
import { S3Service } from 'src/microservices/s3/s3.service';


@Injectable()
export class UsersService {
  constructor(private db: PrismaService, private profilesService: ProfilesService, private s3Service: S3Service) { }
  async create(createUserDto: CreateUserDto, file?: Express.MulterS3.File) {
    const emailUnique = await this.db.user.findUnique({ where: { email: createUserDto.email } });
    if (emailUnique) {
      throw new BadRequestException("Email Address already exists");
    }
    const usernameUnique = await this.db.user.findUnique({ where: { username: createUserDto.username } });
    if (usernameUnique) {
      throw new BadRequestException("Username already exists");
    }
    createUserDto.password = await argon.hash(createUserDto.password);
    const { name, image, ...userObj } = createUserDto;
    const newUser = await this.db.user.create({ data: userObj });
    await this.profilesService.create({ name, image }, file, newUser);
    return newUser;
  }

  async findAll() {
    return this.db.user.findMany({ select: { id: true, email: true, emailVerified: true, createdAt: true, updatedAt: true, username: true } })
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.db.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException("User not found");
    }
    const profile = await this.db.profile.findFirst({ where: { userId: id } });
    await this.s3Service.deleteFile(profile.image); // Delete user image from S3
    await this.db.user.delete({ where: { id } });
    return user;
  }

  async createVerified(createUserDto: CreateUserDto, file?: Express.MulterS3.File) {
    const emailUnique = await this.db.user.findUnique({ where: { email: createUserDto.email } });
    if (emailUnique) {
      throw new BadRequestException("Email Address already exists");
    }
    const usernameUnique = await this.db.user.findUnique({ where: { username: createUserDto.username } });
    if (usernameUnique) {
      throw new BadRequestException("Username already exists");
    }
    const { name, image, ...userObj } = createUserDto;
    const newUser = await this.db.user.create({ data: { ...userObj, emailVerified: true } });
    await this.profilesService.create({ name, image }, file, newUser);
    return newUser;
  }
  async setUserVerified(userId: string) {
    return this.db.user.update({ where: { id: userId }, data: { emailVerified: true } });
  }
}


