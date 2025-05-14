/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsMobilePhone } from 'class-validator';

export class VerifyOtpDto {
  @IsMobilePhone('en-IN')
  mobile: string;

  @IsString()
  otp: string;
}
