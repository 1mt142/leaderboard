import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leaderboard } from './entities/leaderboard.entity';
import { Score } from 'src/scores/entities/score.entity';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
    @InjectRepository(Leaderboard)
    private leaderboardRepository: Repository<Leaderboard>,
  ) {}

  async getTopScores(): Promise<Leaderboard[]> {
    const topScores = await this.scoreRepository.find({
      order: {
        score: 'DESC',
      },
      take: 10,
    });

    const leaderboardEntries = topScores.map((score) => {
      const entry = new Leaderboard();
      entry.name = score.name;
      entry.score = score.score;
      return entry;
    });

    await this.leaderboardRepository.clear();
    await this.leaderboardRepository.save(leaderboardEntries);

    return leaderboardEntries;
  }
}
