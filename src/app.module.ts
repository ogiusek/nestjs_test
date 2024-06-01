import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { JwtConfigModule } from './common/modules/jwt/jwt.module';
import { typeOrmConfigModule } from './common/modules/typeorm/typeorm.module';
import { PermissionModule } from './common/modules/permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    typeOrmConfigModule,
    JwtConfigModule,
    BooksModule,
    UsersModule,
    PermissionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};
