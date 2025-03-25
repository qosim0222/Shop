import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ChatGateway } from 'src/chat/chat.gateway';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports:[ChatModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
