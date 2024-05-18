import type { NextRequest } from "next/server";
import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db, eq, schema } from "@trev/db";
import type { TTeamspace, TTenant, TUser } from "@trev/db/src/schema";

type CreateContextOptions = {
  tenant: TTenant | null; //tenant is who logsin
  teamspace?: TTeamspace | null;
  user?: TUser | null;
  req?: NextRequest;
};

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    ...opts,
    // give access to db
    db,
  };
};

export const createTRPCContext = async (opts: {
  req: NextRequest;
  serverSideCall?: boolean;
}) => {
  //todo
  const teamspace = null;
  const user = null;
  const tenant = {
    id: 1,
    name: "devdynamics",
  };

  return createInnerTRPCContext({
    teamspace,
    tenant,
    user,
    req: opts.req,
  });
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.tenant?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const tenantToTeamspaces = await db.query.teamspace.findMany({
    where: eq(schema.teamspace.tenant_id, ctx.tenant.id),
    with: {
      tenant: true,
    },
  });

  const teamspaceSlug =
    ctx.req?.cookies.get("teamspace-slug")?.value || "frontend";

  console.log("teamspaceSlug", { teamspaceSlug });

  if (!teamspaceSlug) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "teamspace Slug Not Found",
    });
  }

  const activeTeamspace = tenantToTeamspaces.find((teamspace) => {
    // If there is a workspace slug in the cookie, use it to find the workspace
    if (teamspaceSlug) return teamspace.name === teamspaceSlug;
    return true;
  });

  if (!activeTeamspace) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Workspace Not Found",
    });
  }

  const teamspace = schema.selectTeamspaceSchema.parse(activeTeamspace);

  return next({
    ctx: {
      ...ctx,
      tenant: ctx.tenant,
      teamspace,
    },
  });
});

/**
 * Middleware to parse form data and put it in the rawInput
 */
export const formdataMiddleware = t.middleware(async (opts) => {
  const formData = await opts.ctx.req?.formData?.();
  console.log("formData", formData);
  if (!formData) throw new TRPCError({ code: "BAD_REQUEST" });

  return opts.next({
    rawInput: formData,
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
