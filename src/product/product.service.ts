import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ActiveProductDto, CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, req: Request) {
    let {colorItem, ...createData } = createProductDto;
    let user = req['user'];
    try {
      let category = await this.prisma.category.findUnique({
        where: { id: createData.categoryId },
      });

      if (!category) {
        return new NotFoundException('Not found category');
      }

      if (!colorItem.length) {
        return new BadRequestException('Colors cannot be empty');
      }


      let newProduct = await this.prisma.product.create({
        data: { ...createData, userId: user.id },
      });

      for (let col of colorItem) {
        let color = await this.prisma.colorItem.create({
          data: { colorId: col, productId: newProduct.id },
        });
      }

      return { data: newProduct };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async activate(activeProductDto: ActiveProductDto) {
    let { productId } = activeProductDto;
    try {
      await this.prisma.product.update({
        data: { status: 'ACTIVE' },
        where: { id: productId },
      });

      return { data: 'Product activated' };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.product.findMany({
        where: { status: 'ACTIVE' },
        include: { category: true },
      });

      if (!data.length) {
        return new NotFoundException('No products found');
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string, req: Request) {
    let user = req['user'];
    try {
      let data = await this.prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
          user: true,
          Comment: {
            include: { User: true },
          },
          ColorItem: {
            include: { color: true },
          },
          _count: true,
        },
      });

      if (!data) {
        return new NotFoundException('No products found');
      }

      let view = await this.prisma.view.findFirst({
        where: { userId: user.id, productId: id },
      });

      if (!view) {
        await this.prisma.view.create({
          data: { userId: user.id, productId: id },
        });
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let { categoryId, image, colorItem } = updateProductDto;
    try {
      if (categoryId) {
        let category = await this.prisma.category.findUnique({
          where: { id: categoryId },
        });

        if (!category) {
          return new NotFoundException('Not found category');
        }
      }

      let product = await this.prisma.product.findUnique({ where: { id } });
      if (!product) {
        return new NotFoundException('No product found');
      }

      if (colorItem && !colorItem.length) {
        return new BadRequestException('colorItem cannot be empty');
      } else if (colorItem && colorItem.length) {
        await this.prisma.colorItem.deleteMany({ where: { productId: id } });
      }

      let data = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });

      if (image && image.length) {
        product.image.forEach((image) => {
          let pathfile = path.join('uploads', image);
          try {
            fs.unlinkSync(pathfile);
          } catch (error) {
            console.log(error.message);
          }
        });
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let data = await this.prisma.product.delete({ where: { id } });

      if (data.image.length) {
        data.image.forEach((image) => {
          let pathfile = path.join('uploads', image);
          try {
            fs.unlinkSync(pathfile);
          } catch (error) {
            console.log(error.message);
          }
        });
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async getPending() {
    try {
      let data = await this.prisma.product.findMany({
        where: { status: 'PENDING' },
      });

      if (!data.length) {
        return new NotFoundException('Not found products');
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async getInActive() {
    try {
      let data = await this.prisma.product.findMany({
        where: { status: 'INACTIVE' },
      });

      if (!data.length) {
        return new NotFoundException('Not found products');
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
