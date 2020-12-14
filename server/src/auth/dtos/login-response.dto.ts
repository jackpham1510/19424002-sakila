import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  static of(accessToken: string, refreshToken: string) {
    const loginResponse = new LoginResponse();
    loginResponse.accessToken = accessToken;
    loginResponse.refreshToken = refreshToken;
    return loginResponse;
  }
}
