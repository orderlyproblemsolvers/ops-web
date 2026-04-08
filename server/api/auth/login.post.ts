import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db } from '../../utils/db';
import { users } from '../../database/schema';

export default defineEventHandler(async (event) => {
  // 1. Read the incoming data
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' });
  }

  // 2. Fetch the user from TiDB
  const [user] = await db.select().from(users).where(eq(users.email, email));

  // If user doesn't exist, throw a generic error (prevents email enumeration attacks)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' });
  }

  // 3. Verify the password hash
  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' });
  }

  // 4. Issue the secure, encrypted HTTP-only cookie using nuxt-auth-utils
  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'admin',
    }
  });

  return { success: true };
});