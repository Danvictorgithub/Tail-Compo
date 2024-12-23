import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { User } from '@prisma/client';
import { getSupabasePublicUrl } from 'src/helpers/supabasePublicUrl';

@Injectable()
export class ProfilesService {
  constructor(private db: PrismaService) { }
  async create(createProfileDto: CreateProfileDto, file: Express.MulterS3.File, user: User) {
    // Generates Intiials Image from DiceBear if no image uploaded already
    const image = file ?
      getSupabasePublicUrl(file.location) :
      createProfileDto.image || `https://api.dicebear.com/9.x/initials/svg?seed=${createProfileDto.name}`;
    const newProfile = await this.db.profile.create({ data: { ...createProfileDto, image, user: { connect: { id: user.id } } } });
    return newProfile;
  }

  async findAll() {
    return this.db.profile.findMany();
  }

  async findOne(id: string) {
    const profile = await this.db.profile.findUnique({ where: { id } });
    if (!profile) {
      return new NotFoundException("Profile not found");
    }
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto, file: Express.Multer.File, user: User) {
    const profile = await this.db.profile.findUnique({ where: { id } });
    const image = file ? file.path : `https://api.dicebear.com/9.x/initials/svg?seed=${updateProfileDto.name || profile.name}`;
    return this.db.profile.update({ where: { id }, data: { ...updateProfileDto, image } });
  }

  async remove(id: string) {
    const profile = await this.db.profile.findUnique({ where: { id } });
    if (!profile) {
      return new NotFoundException("Profile not found");
    }
    await this.db.profile.delete({ where: { id } });
    return profile;
  }
}
