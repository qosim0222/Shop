import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatGateway } from 'src/chat/chat.gateway';
import { Request } from 'express';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private chat: ChatGateway,
  ) {}

  async create(createOrderDto: CreateOrderDto, req: Request) {
    let user = req['user'];
    let { productId, count } = createOrderDto;
    try {
      let product = await this.prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return new NotFoundException('Not found product');
      }

      if (product.count < count) {
        return new BadRequestException('Not enough products');
      }
      let data = await this.prisma.order.create({
        data: {
          ...createOrderDto,
        userId: user.id,
         
        },
      });
      await this.prisma.product.update({
        where: { id: productId, count: { gte: count } },
        data: { count: { decrement: count } },
      });

      this.chat.server.emit('newOrder', {
        message: 'order yaratildi',
        order: data,
      });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let order = await this.prisma.order.findUnique({ where: { id } });
      if (!order) {
        return new NotFoundException('Not found order');
      }

      let data = await this.prisma.order.delete({where:{id}});
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
