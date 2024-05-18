import { eq } from "@trev/db";
import { teamspace, tenant } from "@trev/db/src/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const tenantRouter = createTRPCRouter({
  getCurrentTenant: protectedProcedure.query(async (opts) => {
    const currentTenant = await opts.ctx.db
      .select()
      .from(tenant)
      .where(eq(tenant.id, opts.ctx.tenant.id));
    return currentTenant;
  }),

  getTeamspaces: protectedProcedure.query(async (opts) => {
    const result = await opts.ctx.db
      .select()
      .from(teamspace)
      .where(eq(teamspace.id, opts.ctx.tenant.id));

    console.log("result", result);
    return result;
  }),
});
