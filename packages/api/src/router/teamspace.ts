import { eq } from "@trev/db";
import { user } from "@trev/db/src/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const teamspaceRouter = createTRPCRouter({
  getUsersInCurrentTeamspace: protectedProcedure.query(async (opts) => {
    const currentTenant = await opts.ctx.db
      .select()
      .from(user)
      .where(eq(user.teamspace_id, opts.ctx.teamspace.id));
    return currentTenant;
  }),
});
