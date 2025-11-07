import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get('healthz')
  liveness() {
    return {
      status: 'ok',
      type: 'liveness',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      pid: process.pid,
    };
  }

  @Get('readyz')
  async readiness() {
    const mongo = await this.health.mongoOk();
    if (!mongo) throw new ServiceUnavailableException('mongo not ready');
    return { status: 'ok', type: 'readiness', mongo, timestamp: new Date().toISOString() };
  }
}
