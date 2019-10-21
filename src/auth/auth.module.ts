import * as passport from 'passport';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(
        { path: '/product', method: RequestMethod.ALL },
        { path: '/product/*', method: RequestMethod.ALL },
        { path: '/brand/', method: RequestMethod.ALL },
        { path: '/brand/*', method: RequestMethod.ALL },
        { path: '/category/', method: RequestMethod.ALL },
        { path: '/category/*', method: RequestMethod.ALL },
        { path: '/price-history/', method: RequestMethod.ALL },
        { path: '/price-history/*', method: RequestMethod.ALL });
  }
}