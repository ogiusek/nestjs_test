import { Injectable } from "@nestjs/common";
import { MailerService } from "src/common/config/mailer/mailer.service";

@Injectable()
export class ConfirmationMailService {
  constructor(private readonly mailer: MailerService) {}

  async send(email: string, uuid: string) {
    await this.mailer.send({
      from: process.env.MAILER_USER,
      to: email,
      subject: "Confirm your email",
      html: `<a href="${process.env.URL}:${process.env.PORT}/users/confirm/${uuid}">Click here to confirm your email</a>`
    }).then(() => {
      console.log("email sent");
    }).catch((error) => {
      console.log(error);
    });
  }
}