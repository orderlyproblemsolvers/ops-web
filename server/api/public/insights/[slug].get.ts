import { eq, and } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { insights } from '../../../database/schema';

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug;
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Slug is required' });

  // Fetch the full post data, ensuring it is published
  const post = await db.select()
    .from(insights)
    .where(and(eq(insights.slug, slug), eq(insights.isPublished, true)))
    .limit(1);

  if (!post.length) {
    throw createError({ statusCode: 404, statusMessage: 'Insight not found' });
  }

  return post[0];
});