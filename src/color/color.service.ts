import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createColorDto: CreateColorDto) {
    try {
      let created = await this.prisma.color.create({ data: createColorDto });
      return { data: created };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.color.findMany();
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.prisma.color.findFirst({ where: { id } });
      if (!data) {
        throw new NotFoundException('Color not found');
      }
      return {  data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateColorDto: UpdateColorDto) {
    try {
      let data = await this.prisma.color.findFirst({ where: { id } });
      if (!data) {
        throw new NotFoundException('Color not found');
      }
      let updated = await this.prisma.color.update({ where: { id }, data: updateColorDto });
      return { data: updated };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.color.delete({ where: { id } });
      return { data: deleted };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
