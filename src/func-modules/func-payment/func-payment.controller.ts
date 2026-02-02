import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FuncPaymentService } from './func-payment.service';
import { ReqCreatePaymentDto } from '../../data-modules/payment/dto/request-dto/req-create-payment.dto';
import { ResCreatePaymentDto } from '../../data-modules/payment/dto/response-dto/res-create-payment.dto';

@Controller('payment')
export class FuncPaymentController {
  constructor(private readonly funcPaymentService: FuncPaymentService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createPaymentDto: ReqCreatePaymentDto,
  ): Promise<ResCreatePaymentDto> {
    return this.funcPaymentService.create(createPaymentDto);
  }
}
