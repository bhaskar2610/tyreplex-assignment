import { IsMobilePhone } from 'class-validator';

export class RequestOtpDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsMobilePhone('en-IN')
  mobile: string;
}
