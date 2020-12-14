import { FindManyOptions, Repository } from 'typeorm';
import { PagingRequest } from '../dtos/paging-request.dto';
import { PagingResponse } from '../dtos/paging-response.dto';

export class PagingUtil {
  static async paginate<T>(
    repository: Repository<T>,
    paging: PagingRequest,
    options?: FindManyOptions<T>,
  ) {
    const [items, total] = await repository.findAndCount({
      ...options,
      skip: paging.offset,
      take: paging.pageSize,
    });

    return PagingResponse.of(paging.page, paging.pageSize, total, items);
  }
}
