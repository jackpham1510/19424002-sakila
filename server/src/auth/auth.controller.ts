import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Staff } from 'src/common/entities/staff.entity';
import { AuthService } from './auth.service';
import { LoginRequest } from './dtos/login-request.dto';
import { LoginResponse } from './dtos/login-response.dto';
import { LocalAuthGuard } from './guard/local.guard';
import { TokenService } from './token.service';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService, private tokenService: TokenService) {}

  @Public()
  @Post('/register')
  @ApiExcludeEndpoint()
  register() {
    // TODO: implement this method
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({
    type: LoginRequest,
  })
  @ApiResponse({
    type: LoginResponse,
  })
  @Public()
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/refresh-access-token')
  @ApiResponse({
    type: LoginResponse
  })
  @Public()
  refreshAccessToken(@Query('refresh-token') refreshToken: string) {
    return this.tokenService.getAccessTokenFromRefreshToken(refreshToken);
  }

  @Post('/logout')
  @ApiExcludeEndpoint()
  logout() {
    // TODO: implement this method
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/profile')
  @ApiResponse({
    type: Staff,
  })
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user);
  }
}
