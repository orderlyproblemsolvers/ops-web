import { desc, eq } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { insights } from '../../../database/schema';

export default defineEventHandler(async () => {
  // Fetch only published posts, omitting the heavy HTML content for the list view
  const posts = await db.select({
    id: insights.id,
    title: insights.title,
    slug: insights.slug,
    category: insights.category,
    format: insights.format,
    excerpt: insights.excerpt,
    coverImage: insights.coverImage,
    createdAt: insights.createdAt,
  })
  .from(insights)
  .where(eq(insights.isPublished, true))
  .orderBy(desc(insights.createdAt));

  return posts;
});