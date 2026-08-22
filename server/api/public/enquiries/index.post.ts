import { db } from '~~/server/utils/db';
import { enquiries } from '~~/server/database/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Basic validation — matches the simplified form: fullName, email, interest (free text)
  if (!body.fullName || !body.email || !body.interest) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
  }

  // Split fullName into firstName/lastName for the existing schema.
  // Single-word names (e.g. "Beyonce") land entirely in firstName, lastName stays empty.
  const nameParts = body.fullName.trim().split(/\s+/);
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  // Insert into TiDB
  await db.insert(enquiries).values({
    firstName,
    lastName,
    email: body.email,
    company: body.company || '',
    interest: body.interest,
  });

  return { success: true };
});