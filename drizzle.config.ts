import dotenv from 'dotenv'
import path from 'path'
import { defineConfig } from 'drizzle-kit'

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
})

console.log('DB URL:', process.env.DATABASE_URL) // 👈 DEBUG

export default defineConfig({
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})