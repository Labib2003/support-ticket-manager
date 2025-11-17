import { Injectable } from '@nestjs/common';
import db from 'src/lib/db';

@Injectable()
export class DrizzleService {
  public db = db;
}
