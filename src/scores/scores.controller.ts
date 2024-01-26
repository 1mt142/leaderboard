import { Controller, Post, Body, UseGuards, Headers } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { AuthGuard } from 'src/auth/auth.guard';
import * as jwt from 'jsonwebtoken';

@Controller('scores')
@UseGuards(AuthGuard)
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  private extractToken(authorizationHeader: string): string {
    const [, token] = authorizationHeader.split('Bearer ');
    return token;
  }

  private decodeToken(token: string): any {
    try {
      return jwt.verify(token, '<?OhL^PDdFME8vO');
    } catch (error) {
      console.error('Token verification error:', error.message);
      return null;
    }
  }

  @Post()
  async submitScore(
    @Body() scoreData: { name: string; score: number },
    @Headers('Authorization') Authorization: string,
  ) {
    const token = this.extractToken(Authorization);
    const decodedToken = this.decodeToken(token);
    const updatedLeaderboard = await this.scoresService.addScore(
      scoreData,
      decodedToken,
    );
    return {
      message: 'Score submitted successfully',
      leaderboard: updatedLeaderboard,
    };
  }
}
