import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class ChangePasswordRequest {
  @IsString()
  @MinLength(8)
  @ApiProperty()
  oldPassword: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  newPassword: string;
}