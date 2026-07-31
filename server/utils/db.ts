import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../database/schema';

const config = useRuntimeConfig();
// Creates the connection pool to TiDB
const poolConnection = mysql.createPool({
  uri: config.databaseUrl,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
  },
});

// Export the db instance so we can query it anywhere in our server/ folder
export const db = drizzle(poolConnection, { schema, mode: 'default' });