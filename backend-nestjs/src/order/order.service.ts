/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { KafkaService } from './kafka/kafka.service';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(mobile: string, dto: CreateOrderDto): Promise<ApiResponse<any>> {
    try {
      const order = this.orderRepo.create({ userMobile: mobile, ...dto });
      const saved = await this.orderRepo.save(order);

      await this.kafkaService.emitOrderEvent(saved);

      return {
        success: true,
        message: 'Order created successfully',
        data: { order: saved },
      };
    } catch (error) {
      // Optionally log the error here or send it to a monitoring system
      console.error('Order creation failed:', error);

      // Throwing a structured error response
      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to create order',
        error: error.message,
      });
    }
  }

  async findAll(mobile: string): Promise<ApiResponse<Order[]>> {
    try {
      const orders = await this.orderRepo.find({
        where: { userMobile: mobile },
      });

      return {
        success: true,
        message: 'Orders fetched successfully',
        data: orders,
      };
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message,
      });
    }
  }
}
