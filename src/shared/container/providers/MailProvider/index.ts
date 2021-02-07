import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import MailChimpProvider from './implementations/MailChimpProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  mailChimp: container.resolve(MailChimpProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
