import { CACHE_MANAGER, Inject, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { randomBytes } from 'crypto';

export class TokenService {
  private readonly RTK_TTL;
  private readonly RTK_PREFIX = "rtk_";

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {
    this.RTK_TTL = config.get('jwt.refreshToken.ttl');
  }

  public async createTokens(userId: number) {
    return {
      accessToken: this.jwtService.sign({ sub: userId }),
      refreshToken: await this.createRefreshToken(userId),
    };
  }

  public async createRefreshToken(userId: number) {
    const refreshToken = randomBytes(64).toString('hex');
    await this.cacheManager.set(this.RTK_PREFIX + refreshToken, userId, {
      ttl: this.RTK_TTL,
    });
    return refreshToken;
  }

  public async getAccessTokenFromRefreshToken(refreshToken: string) {
    const userId = await this.cacheManager.get(this.RTK_PREFIX + refreshToken);
    if (!userId) {
      throw new NotFoundException('Refresh token not found');
    }
    await this.deleteRefreshToken(refreshToken);
    return this.createTokens(userId);
  }

  public deleteRefreshToken(refreshToken: string) {
    return this.cacheManager.del(this.RTK_PREFIX + refreshToken);
  }
}
