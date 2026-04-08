import { db } from '../../utils/db';
import { insights } from '../../database/schema';

// Helper to generate a URL-friendly slug from the title
function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default defineEventHandler(async (event) => {
  // Ensure the user is logged in before allowing them to post
  const session = await requireUserSession(event);
  
  const body = await readBody(event);
  const { title, excerpt, content, category, format, coverImage, isPublished } = body;

  if (!title || !content) {
    throw createError({ statusCode: 400, statusMessage: 'Title and content are required' });
  }

  // Generate a unique slug (in a real app, you'd check for duplicates, but this works for now)
  const baseSlug = generateSlug(title);
  const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

  // Insert into TiDB
  await db.insert(insights).values({
    title,
    slug: uniqueSlug,
    excerpt,
    content,
    category,
    format,
    coverImage,
    isPublished: isPublished || false,
  });

  return { success: true, slug: uniqueSlug };
});