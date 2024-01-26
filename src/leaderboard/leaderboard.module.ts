import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leaderboard } from './entities/leaderboard.entity';
import { Score } from 'src/scores/entities/score.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
  imports: [
    TypeOrmModule.forFeature([Leaderboard, Score]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
})
export class LeaderboardModule {}
