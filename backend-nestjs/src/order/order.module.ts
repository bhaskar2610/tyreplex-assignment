import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService, KafkaService],
  controllers: [OrderController],
})
export class OrderModule {}
