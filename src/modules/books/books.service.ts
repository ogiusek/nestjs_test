import { Injectable } from '@nestjs/common';
import { Book } from './entities/books.entity';
import { PostBookDto } from './dtos/post-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private readonly repo: Repository<Book>) {}

  getBooks() {
    return this.repo.find();
  }

  getBook(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  createBook(book: PostBookDto) {
    const new_book = this.repo.create(book);
    return this.repo.save(new_book);
  }

  async updateBook(id: number, book: UpdateBookDto) {
    const new_book = await this.repo.findOne({ where: { id } });
    if(book.title !== "")       new_book.title = book.title;
    if(book.description !== "") new_book.description = book.description;
    if(book.price >= 0)         new_book.price = book.price;
    return this.repo.save(new_book);
  }

  async deleteBook(id: number) {
    const new_book = await this.repo.findOne({ where: { id } });
    return await this.repo.remove(new_book);
  }
};