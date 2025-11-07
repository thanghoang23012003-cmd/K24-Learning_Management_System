import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class HealthService {
  constructor(@InjectConnection() private readonly conn: Connection) {}

  async mongoOk(): Promise<boolean> {
    try {
      await this.conn.db.admin().ping(); // trả lời là được
      return true;
    } catch {
      return false;
    }
  }
}
