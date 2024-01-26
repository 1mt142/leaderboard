import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { Score } from './entities/score.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { LoggingMiddleware } from 'src/common/logging.middleware';

@Module({
  controllers: [ScoresController],
  providers: [ScoresService],
  imports: [
    TypeOrmModule.forFeature([Score]),
    RateLimiterModule.register({
      type: 'Memory',
      points: 10,
      duration: 60,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
})
export class ScoresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('scores');
  }
}
