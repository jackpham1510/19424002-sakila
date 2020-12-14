import { ApiProperty } from '@nestjs/swagger';

export class PagingResponse<T> {
  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  items: T[];

  static of<T>(page: number, pageSize: number, total: number, items: T[]) {
    const paging = new PagingResponse<T>();
    paging.page = page;
    paging.pageSize = pageSize;
    paging.total = total;
    paging.items = items;
    return paging;
  }
}
