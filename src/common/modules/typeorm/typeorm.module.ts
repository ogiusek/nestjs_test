import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: ()=>({
        type:         process.env.ORM_DB_TYPE as any,
        host:         process.env.ORM_DB_HOST,
        port:         process.env.ORM_DB_PORT as any,
        username:     process.env.ORM_DB_USER,
        password:     process.env.ORM_DB_PASS,
        database:     process.env.ORM_DB_NAME,
        synchronize:  process.env.ORM_DB_SYNC === 'true',
        entities:     ["**/*.entity.js"],
      })
    })
  ],
  exports: [TypeOrmModule]
})
export class typeOrmConfigModule{};