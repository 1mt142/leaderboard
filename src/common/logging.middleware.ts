import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logFilePath = path.join('request-logs.txt');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const logEntry = `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}\n`;

      // Append the log entry to the file
      fs.appendFile(this.logFilePath, logEntry, (err) => {
        if (err) {
          console.error(`Error writing to log file: ${err.message}`);
        }
      });
    });

    next();
  }
}
