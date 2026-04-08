import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../database/schema';

// Creates the connection pool to TiDB
const poolConnection = mysql.createPool(process.env.DATABASE_URL!);

// Export the db instance so we can query it anywhere in our server/ folder
export const db = drizzle(poolConnection, { schema, mode: 'default' });