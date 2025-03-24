import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) { }
  async create(createCommentDto: CreateCommentDto, req: Request) {
    let user = req['user'];
    try {
      let data = await this.prisma.comment.create({
        data: { ...createCommentDto, userId: user.id },
      });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  
  async findAll() {
    try {
      let data = await this.prisma.comment.findMany();
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.prisma.comment.findFirst({ where: { id } });
      if (!data) {
        throw new NotFoundException('Comment not found');
      }
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      let data = await this.prisma.comment.update({
        data: updateCommentDto,
        where: { id },
      });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let data = await this.prisma.comment.delete({ where: { id } });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
