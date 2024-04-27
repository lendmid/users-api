import type { INestApplication } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

export function setupRateLimit(app: INestApplication): void {
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      skipSuccessfulRequests: false,
      message: {
        message: 'Too many requests, try again later',
        statusCode: 403,
      },
    }),
  );
}
