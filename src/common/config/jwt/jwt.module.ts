import { JwtModule } from '@nestjs/jwt';
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    })
  ],
  providers: [],
  exports: [JwtModule]
})
export class JwtConfigModule{};