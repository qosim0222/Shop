import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { LikeModule } from './like/like.module';
import { RegionModule } from './region/region.module';
import { ProductModule } from './product/product.module';
import { ColorModule } from './color/color.module';

@Module({
  imports: [UploadModule,
    ServeStaticModule.forRoot({
      rootPath:join(__dirname, '..', 'uploads'),
      serveRoot:'/uploads'
    }),
    PrismaModule,
    UserModule,
    OrderModule,
    CommentModule,
    CategoryModule,
    LikeModule,
    RegionModule,
    ProductModule,
    ColorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
