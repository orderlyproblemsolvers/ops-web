import { desc } from 'drizzle-orm';
import { db } from '~~/server/utils/db';
import { enquiries } from '~~/server/database/schema';

interface AppUser {
  role?: 'admin' | 'user'
}

export default defineEventHandler(async (event) => {
  try {
    // 1. Authentication & Authorization Check
    const session = await requireUserSession(event) as { user: AppUser | null };

    // Ensure the user actually has admin privileges, not just an active session
    if (session.user?.role !== 'admin') {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden: Admin access required' });
    }

    // 2. Pagination & Data Caps (DoS Protection)
    const query = getQuery(event);

    // Native JS parsing to ensure limit is a number, defaults to 50, and never exceeds 100
    let limit = 50;
    if (query.limit && !isNaN(Number(query.limit))) {
      limit = Math.min(Math.max(parseInt(String(query.limit), 10), 1), 100);
    }

    // Native JS parsing for offset
    let offset = 0;
    if (query.offset && !isNaN(Number(query.offset))) {
      offset = Math.max(parseInt(String(query.offset), 10), 0);
    }

    // 3. Database Execution
    const records = await db.select()
      .from(enquiries)
      .orderBy(desc(enquiries.createdAt))
      .limit(limit)
      .offset(offset);

    // 4. Shape for the admin UI — the public form now collects a single
    // "fullName" field, so surface that same shape here even though the
    // table still stores firstName/lastName separately underneath.
    return records.map((record) => ({
      ...record,
      fullName: [record.firstName, record.lastName].filter(Boolean).join(' '),
    }));

  } catch (error: any) {
    // 5. Safe Error Masking
    // Log the actual TiDB/SQL stack trace to your server logs
    console.error('API Error [GET /enquiries]:', error);

    // If it's a planned Nuxt error (like our 403 above), pass it through
    if (error.statusCode) {
      throw error;
    }

    // Otherwise, return a generic 500 to the client so you don't leak database architecture
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});