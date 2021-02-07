import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTampleteProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
