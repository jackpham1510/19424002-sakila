import { Injectable } from '@nestjs/common';
import { Staff } from 'src/common/entities/staff.entity';
import { StaffService } from 'src/staff/staff.service';
import { LoginResponse } from './dtos/login-response.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private staffService: StaffService,
    private tokenService: TokenService
  ) {
  }

  async validateLogin(username: string, password: string) {
    const user = await this.staffService.findOneByUsername(username);
    if (!user) {
      return null;
    }
    const isValidPassword = true; // TODO: add logic here
    if (isValidPassword) {
      return user;
    }
    return null;
  }

  async login(user: Staff) {
    const token = await this.tokenService.createTokens(user.staffId);
    return LoginResponse.of(token.accessToken, token.refreshToken);
  }

  getProfile(authUser: any) {
    return this.staffService.findOneById(authUser.id);
  }
}
