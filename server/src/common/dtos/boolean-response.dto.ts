import { ApiProperty } from "@nestjs/swagger";

export class BooleanResponse {
  @ApiProperty()
  success: boolean;

  static of(success: boolean) {
    const res = new BooleanResponse();
    res.success = success;
    return res;
  }
}
