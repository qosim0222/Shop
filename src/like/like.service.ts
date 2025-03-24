import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async create(createLikeDto: CreateLikeDto, req: Request) {
    let user = req['user'];
    try {
      let data = await this.prisma.like.create({
        data: { ...createLikeDto, userId: user.id },
      });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let data = await this.prisma.like.delete({ where: { id } });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}

