import { Controller, Get, UseGuards } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('leaderboard')
@UseGuards(AuthGuard)
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  async getLeaderboard() {
    const leaderboard = await this.leaderboardService.getTopScores();
    return { leaderboard };
  }
}
