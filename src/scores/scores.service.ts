import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
    private readonly jwtService: JwtService,
  ) {}

  async addScore(
    scoreData: {
      name: string;
      score: number;
    },
    decodedToken: any,
  ): Promise<Score[]> {
    const name = decodedToken.username;
    const payload = { name, score: scoreData.score };
    const newScore = this.scoreRepository.create(payload);
    await this.scoreRepository.save(newScore);

    return this.getTopScores();
  }

  async getTopScores(): Promise<Score[]> {
    return this.scoreRepository.find({
      order: {
        score: 'DESC',
      },
      take: 10,
    });
  }
}
