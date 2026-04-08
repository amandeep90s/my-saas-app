import { eq } from 'drizzle-orm';
import { Elysia } from 'elysia';

import { auth } from '@/lib/auth';
import { db, purchases } from '@/lib/db';

export const purchasesRoute = new Elysia({ prefix: '/purchases' }).get(
  '/status',
  async ({ request, set }) => {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      set.status = 401;
      return { error: 'Unauthorized' };
    }

    const purchase = await db
      .select()
      .from(purchases)
      .where(eq(purchases.userId, session.user.id))
      .limit(1);

    return purchase[0] ?? null;
  },
);
