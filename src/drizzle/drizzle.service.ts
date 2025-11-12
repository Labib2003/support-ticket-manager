import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from 'db/schema';
import { ConfigService } from '@nestjs/config';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DrizzleService {
  public db: NodePgDatabase<typeof schema>;

  constructor(private configService: ConfigService) {
    const pool = new Pool({
      connectionString: this.configService.get<string>('DATABASE_URL'),
    });
    this.db = drizzle(pool, { schema });
  }
}
