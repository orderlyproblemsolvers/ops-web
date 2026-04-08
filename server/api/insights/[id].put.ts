import { eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { insights } from '../../database/schema';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const id = parseInt(event.context.params?.id || '0');
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Invalid Insight ID' });

  const body = await readBody(event);
  
  // Re-generate the slug just in case the title changed
  const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  await db.update(insights).set({
    title: body.title,
    slug: slug,
    category: body.category,
    format: body.format,
    excerpt: body.excerpt,
    content: body.content,
    coverImage: body.coverImage,
    isPublished: body.isPublished,
    // updatedAt: new Date(), // Uncomment if you added this to your schema!
  }).where(eq(insights.id, id));

  return { success: true };
});