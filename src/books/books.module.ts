import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/books.entity';
import booksAuthMiddleware from 'src/common/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(booksAuthMiddleware).forRoutes('books');
  }
}
