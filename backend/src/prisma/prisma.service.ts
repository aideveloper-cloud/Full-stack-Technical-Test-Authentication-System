import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import 'dotenv/config.js';
@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
  super({ adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! }) });
    }
}
