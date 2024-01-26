import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { Leaderboard } from './leaderboard/entities/leaderboard.entity';
import { ScoresModule } from './scores/scores.module';
import { Score } from './scores/entities/score.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [User, Score, Leaderboard],
      type: 'mysql',
      host: process.env.APP_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.APP_SYNCHRONIZE === 'true',
      logging: process.env.APP_LOGGING === 'true',
    }),
    UserModule,
    ScoresModule,
    LeaderboardModule,
    ScoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
