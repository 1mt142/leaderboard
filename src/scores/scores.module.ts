import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { Score } from './entities/score.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { LoggingMiddleware } from 'src/common/logging.middleware';

@Module({
  controllers: [ScoresController],
  providers: [ScoresService],
  imports: [
    TypeOrmModule.forFeature([Score]),
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
