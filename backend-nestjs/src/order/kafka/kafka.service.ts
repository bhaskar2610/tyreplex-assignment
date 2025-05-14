/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';

@Injectable()
export class KafkaService {
  async emitOrderEvent(order: Order) {
    // Simulate Kafka logging
    console.log('Kafka Emit:', {
      order_id: order.id,
      timestamp: order.createdAt.toISOString(),
    });
  }
}
