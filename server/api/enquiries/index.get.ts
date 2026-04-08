import { desc } from 'drizzle-orm';
import { db } from '../../utils/db';
import { enquiries } from '../../database/schema';

export default defineEventHandler(async (event) => {
  try {
    // 1. Authentication & Authorization Check
    const session = await requireUserSession(event);
    
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

    return records;

  } catch (error: any) {
    // 4. Safe Error Masking
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