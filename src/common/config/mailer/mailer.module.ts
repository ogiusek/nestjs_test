import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule } from "@nestjs/config";
import { MailerService } from "./mailer.service";


@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        transport: {
          host: process.env.MAILER_HOST,
          port: Number(process.env.MAILER_PORT),
          secure: process.env.MAILER_SECURE.toLowerCase() === 'true',
          auth: {
            user: `${process.env.MAILER_USER}`,
            pass: `${process.env.MAILER_PASS}`
          }
        },
        defaults: {
          // from: process.env.MAILER_FROM
          from: `No Reply <${process.env.MAILER_FROM}>`
        }
      })
    })
  ],
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerConfigModule {}