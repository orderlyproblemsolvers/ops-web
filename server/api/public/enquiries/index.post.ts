import { db } from '../../../utils/db';
import { enquiries } from '../../../database/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Basic validation
  if (!body.firstName || !body.lastName || !body.email || !body.message || !body.interest) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
  }

  // Insert into TiDB
  await db.insert(enquiries).values({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    company: body.company || '',
    interest: body.interest,
    message: body.message,
  });

  return { success: true };
});