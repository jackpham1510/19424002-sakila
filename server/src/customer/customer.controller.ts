import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BooleanResponse } from "src/common/dtos/boolean-response.dto";
import { SearchRequest } from "src/common/dtos/search-request.dto";
import { StdResponse } from "src/common/dtos/std-response.dto";
import { Customer } from "src/common/entities/customer.entity";
import { CustomerService } from "./customer.service";

@ApiTags("Customer")
@Controller("/customer")
export class CustomerController {
  constructor(private customerService: CustomerService) {
  }

  @Get("/search")
  @ApiResponse({
    type: Customer,
    isArray: true
  })
  @ApiBearerAuth()
  search(@Query() searchRequest: SearchRequest) {
    return this.customerService.searchCustomer(searchRequest);
  }

  @Post()
  @ApiResponse({
    type: StdResponse
  })
  @ApiBearerAuth()
  async create(@Body() customer: Customer) {
    const newCustomer = await this.customerService.createCustomer(customer);
    return StdResponse.of(HttpStatus.OK, newCustomer.customerId);
  }

  @Put(":id")
  @ApiResponse({
    type: BooleanResponse
  })
  @ApiBearerAuth()
  async update(@Param("id") id: number, @Body() customer: Customer) {
    const success = await this.customerService.updateCustomer(id, customer);
    return BooleanResponse.of(success);
  }

  @Delete(":id")
  @ApiResponse({
    type: BooleanResponse
  })
  @ApiBearerAuth()
  async delete(@Param("id") id: number) {
    const success = await this.customerService.updateStatus(id, false);
    return BooleanResponse.of(success);
  }

  @Post("/recover/:id")
  @ApiResponse({
    type: BooleanResponse
  })
  @ApiBearerAuth()
  async recover(@Param("id") id: number) {
    const success = await this.customerService.updateStatus(id, true);
    return BooleanResponse.of(success);
  }
}