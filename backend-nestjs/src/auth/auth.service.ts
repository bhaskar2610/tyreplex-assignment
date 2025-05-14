import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private redisService: RedisService,
    private jwtService: JwtService,
  ) {}

  async requestOtp(mobile: string) {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await this.redisService.set(`otp:${mobile}`, otp, 1800);

      console.log(`OTP for ${mobile}: ${otp}`);
      return { message: 'OTP sent (simulated)' };
    } catch (error) {
      console.error('Failed to send OTP:', error);
      throw new InternalServerErrorException('Could not send OTP');
    }
  }

  async verifyOtp(
    mobile: string,
    otp: string,
  ): Promise<ApiResponse<{ token: string }>> {
    try {
      const storedOtp = await this.redisService.get(`otp:${mobile}`);

      if (!storedOtp || storedOtp !== otp) {
        return {
          success: false,
          error: 'Invalid OTP',
          message: 'The OTP you entered is incorrect or expired',
        };
      }

      await this.redisService.del(`otp:${mobile}`);

      const payload = { mobile };
      const token = this.jwtService.sign(payload);

      return {
        success: true,
        data: { token },
        message: 'OTP verified successfully',
      };
    } catch (error) {
      console.error(`Error verifying OTP for ${mobile}:`, error);

      return {
        success: false,
        error: 'Internal Server Error',
        message: 'Something went wrong while verifying OTP',
      };
    }
  }
}
