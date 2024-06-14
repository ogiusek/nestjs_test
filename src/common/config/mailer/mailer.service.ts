import { ISendMailOptions, MailerService as Mailer } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailerService{
  constructor(private readonly mailer: Mailer){}

  async send(options: ISendMailOptions): Promise<any> {
    return await this.mailer.sendMail(options);
  }
};