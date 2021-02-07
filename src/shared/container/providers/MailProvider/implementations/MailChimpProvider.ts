import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class MailChimpProvider implements IMailProvider {
  private client: Transporter;

  private emailAdress: string;

  private emailPassword: string;

  constructor(
    @inject('MailTamplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.emailAdress = mailConfig.defaults.from.email;
    this.emailPassword = mailConfig.defaults.from.password;

    this.client = nodemailer.createTransport(
      `smtps://${this.emailAdress}:${this.emailPassword}@smtp.gmail.com`,
    );
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || this.emailAdress,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
