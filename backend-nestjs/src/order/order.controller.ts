/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateOrderDto) {
    console.log(req.user.mobile);
    return this.orderService.create(req.user.mobile, dto);
  }

  @Get('order-history')
  findAll(@Request() req) {
    return this.orderService.findAll(req.user.mobile);
  }
}
