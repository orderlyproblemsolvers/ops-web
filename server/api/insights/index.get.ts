import { desc } from 'drizzle-orm';
import { db } from '../../utils/db';
import { insights } from '../../database/schema';

export default defineEventHandler(async (event) => {
  try {
    // 1. Authentication & Authorization (Role-Based Access)
    const session = await requireUserSession(event);
    
    // Make sure they aren't just logged in, but actually have admin rights
    if (session.user?.role !== 'admin') {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden: Admin access required' });
    }

    // 2. Pagination & Data Caps (Defense against DB DoS)
    const query = getQuery(event);
    // Force a number, default to 50, and hard-cap at 100 rows per request
    const limit = Math.min(parseInt(query.limit as string) || 50, 100); 
    const offset = parseInt(query.offset as string) || 0;

    // 3. Execute Query
    const posts = await db.select({
      id: insights.id,
      title: insights.title,
      slug: insights.slug,
      category: insights.category,
      format: insights.format,
      isPublished: insights.isPublished,
      createdAt: insights.createdAt,
    })
    .from(insights)
    .orderBy(desc(insights.createdAt))
    .limit(limit)
    .offset(offset);

    return posts;

  } catch (error: any) {
    // 4. Safe Error Handling
    // Log the actual error to your server console for debugging
    console.error('API Error [GET /insights]:', error);
    
    // Throw a generic error to the client so you don't leak database stack traces
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
    });
  }
});