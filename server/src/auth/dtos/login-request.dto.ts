import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginRequest {
  @IsString()
  @MinLength(4)
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  @MinLength(8)
  password: string;

  static of(username: string, password: string) {
    const loginRequest = new LoginRequest();
    loginRequest.username = username;
    loginRequest.password = password;
    return loginRequest;
  }
}
