import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import * as schema from './server/database/schema';

// Load environment variables from .env
dotenv.config();

async function main() {
  console.log('🌱 Starting database seed...');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in your .env file.');
    process.exit(1);
  }

  // Use the exact same connection logic as your app
  const dbUrl = process.env.DATABASE_URL;
  const connectionUrl = dbUrl.includes('ssl=') ? dbUrl : `${dbUrl}?ssl={"rejectUnauthorized":true}`;
  
  const poolConnection = mysql.createPool(connectionUrl);
  const db = drizzle(poolConnection, { schema, mode: 'default' });

  // ─── EDIT THESE DETAILS ──────────────────────────────────────────
  const adminEmail = 'orderlyproblemsolvers@gmail.com'; // Change this
  const adminName = 'OPS admin'; // Change this
  const rawPassword = 'OPSadmin2025#'; // Change this!
  // ───────────────────────────────────────────────────────────────

  try {
    console.log(`Hashing password for ${adminEmail}...`);
    // Hash the password with a salt round of 10 (standard security)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(rawPassword, salt);

    console.log('Inserting user into the database...');
    await db.insert(schema.users).values({
      email: adminEmail,
      name: adminName,
      passwordHash: passwordHash,
      role: 'admin',
    });

    console.log('✅ Success! Master admin user created.');
    console.log(`You can now log in at /admin/login with: ${adminEmail}`);

  } catch (error: any) {
    // If you run this twice, it will fail because email is UNIQUE
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('⚠️ User already exists in the database. No action taken.');
    } else {
      console.error('❌ Seed failed:', error);
    }
  } finally {
    // Close the connection so the script exits cleanly
    await poolConnection.end();
    process.exit(0);
  }
}

main();