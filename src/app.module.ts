import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './modules/books/books.module';
import { UsersModule } from './modules/users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { JwtConfigModule } from './common/config/jwt/jwt.module';
import { typeOrmConfigModule } from './common/config/typeorm/typeorm.module';
import { PermissionModule } from './common/config/permission/permission.module';

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
