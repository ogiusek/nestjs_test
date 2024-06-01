import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { PostBookDto } from './dtos/post-book.dto';
import { BooksService } from './books.service';
import { UpdateBookDto } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService){}

  @Get()
  getBooks() {
    return this.bookService.getBooks();
  }

  @Get(":id")
  getBook(@Param("id") id: number) {
    return this.bookService.getBook(id);
  }

  @Post()
  createBook(@Body() body: PostBookDto) {
    return this.bookService.createBook(body);
  }

  @Patch(":id")
  updateBook(@Param("id") id: number, @Body() body: UpdateBookDto) {
    return this.bookService.updateBook(id, body);
  }

  @HttpCode(204)
  @Delete(":id")
  deleteBook(@Param("id") id: number) {
    return this.bookService.deleteBook(id);
  }
};