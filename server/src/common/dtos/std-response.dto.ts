import { ApiProperty } from "@nestjs/swagger";

export class StdResponse<T> {
  @ApiProperty()
  code: number;
  
  @ApiProperty()
  result: T;

  static of<R>(code: number, result: R) {
    const res = new StdResponse<R>();
    res.code = code;
    res.result = result;
    return res;
  }
}
