import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { User } from '@prisma/client';
import { getSupabasePublicUrl } from 'src/helpers/supabasePublicUrl';
import { S3Service } from 'src/microservices/s3/s3.service';

@Injectable()
export class ProfilesService {
  constructor(
    private db: PrismaService,
    private s3Service: S3Service,
  ) {}
  async create(
    createProfileDto: CreateProfileDto,
    file: Express.MulterS3.File,
    user: User,
  ) {
    // Generates Intiials Image from DiceBear if no image uploaded already
    createProfileDto.image = file
      ? getSupabasePublicUrl(file.location)
      : createProfileDto.image ||
        `https://api.dicebear.com/9.x/initials/svg?seed=${createProfileDto.name}`;
    const newProfile = await this.db.profile.create({
      data: { ...createProfileDto, user: { connect: { id: user.id } } },
    });
    return newProfile;
  }

  async findAll() {
    return this.db.profile.findMany();
  }

  async findOne(id: string) {
    const profile = await this.db.profile.findFirst({
      where: { OR: [{ id }, { user: { username: id } }] },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    const user = await this.db.user.findFirst({
      where: {
        profile: {
          id: profile.id,
        },
      },
      select: {
        username: true,
      },
    });
    return { ...profile, user };
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
    file: Express.MulterS3.File,
    user: User,
  ) {
    const profile = await this.db.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    if (file) {
      updateProfileDto.image = getSupabasePublicUrl(file.location);
      this.s3Service.deleteFile(profile.image);
    }
    return this.db.profile.update({
      where: { id },
      data: { ...updateProfileDto },
    });
  }

  async remove(id: string) {
    const profile = await this.db.profile.findUnique({ where: { id } });
    if (!profile) {
      return new NotFoundException('Profile not found');
    }
    await this.db.profile.delete({ where: { id } });
    return profile;
  }
}
