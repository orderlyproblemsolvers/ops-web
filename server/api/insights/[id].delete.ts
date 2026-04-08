import { eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { insights } from '../../database/schema';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  // Grab the ID from the URL parameter (e.g., /api/insights/5)
  const id = parseInt(event.context.params?.id || '0');

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid Insight ID' });
  }

  // Delete the record from TiDB
  await db.delete(insights).where(eq(insights.id, id));

  return { success: true };
});