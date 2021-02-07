interface IMailConfig {
  driver: 'ethereal' | 'mailChimp';

  defaults: {
    from: {
      name: string;
      email: string;
      password: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      name: 'Felipe',
      email: process.env.EMAIL_ADRESS,
      password: process.env.EMAIL_PASSWORD,
    },
  },
} as IMailConfig;
