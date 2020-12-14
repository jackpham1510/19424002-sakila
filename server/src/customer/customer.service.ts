import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchRequest } from 'src/common/dtos/search-request.dto';
import { Customer } from 'src/common/entities/customer.entity';
import { PagingUtil } from 'src/common/utils/paging.util';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  searchCustomer(request: SearchRequest) {
    const firstNameCondition: any = {};
    const lastNameCondition: any = {};
    const emailCondition: any = {};
    const andConditions = { active: true };
    if (request.isSearchTermExists) {
      firstNameCondition.firstName = Like(`%${request.searchTerm}%`);
      lastNameCondition.lastName = Like(`%${request.searchTerm}%`);
      emailCondition.email = Like(`%${request.searchTerm}%`);
    }
    return PagingUtil.paginate(this.customerRepository, request, {
      where: [
        { ...firstNameCondition, ...andConditions },
        { ...lastNameCondition, ...andConditions },
        { ...emailCondition, ...andConditions },
      ],
    });
  }

  findOneById(id: number) {
    return this.customerRepository.findOne(id);
  }

  async createCustomer(customer: Customer) {
    return this.customerRepository.save({
      storeId: customer.storeId,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      addressId: customer.addressId,
      active: true
    });
  }

  async updateCustomer(id: number, customer: Customer) {
    const result = await this.customerRepository.update(
      { customerId: id },
      {
        storeId: customer.storeId,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        addressId: customer.addressId,
      },
    );
    return result.affected > 0;
  }

  async updateStatus(id: number, active: boolean) {
    const result = await this.customerRepository.update(
      { customerId: id },
      { active },
    );
    return result.affected > 0;
  }
}
