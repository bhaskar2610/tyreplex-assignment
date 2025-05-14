import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: Redis;
  private readonly logger = new Logger(RedisService.name);
  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
    });
  }

  async set(key: string, value: string, ttl: number) {
    try {
      await this.client.set(key, value, 'EX', ttl);
    } catch (error) {
      this.logger.error(`Redis set error for key "${key}"`, error);
      throw error;
    }
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async del(key: string) {
    return this.client.del(key);
  }

  onModuleDestroy() {
    void this.client.quit();
  }
}
