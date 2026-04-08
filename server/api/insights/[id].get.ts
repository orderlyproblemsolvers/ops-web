import { eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { insights } from '../../database/schema';

export default defineEventHandler(async (event) => {
  await requireUserSession(event); // Secure it!
  const id = parseInt(event.context.params?.id || '0');
  
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Invalid Insight ID' });

  const post = await db.select().from(insights).where(eq(insights.id, id)).limit(1);
  
  if (!post.length) {
    throw createError({ statusCode: 404, statusMessage: 'Insight not found' });
  }

  return post[0];
});