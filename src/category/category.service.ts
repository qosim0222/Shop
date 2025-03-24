import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      let created = await this.prisma.category.create({ data: createCategoryDto });
      return { data: created };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.category.findMany();
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.prisma.category.findFirst({ where: { id } });
      if (!data) {
        throw new NotFoundException('Category not found');
      }
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      let data = await this.prisma.category.findFirst({ where: { id } });
      if (!data) {
        throw new NotFoundException('Category not found');
      }
      let updated = await this.prisma.category.update({ where: { id }, data: updateCategoryDto });
      return { data: updated };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.category.delete({ where: { id } });
      return { data: deleted };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
