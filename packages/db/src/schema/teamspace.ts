import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { aggregatedEvents } from "./aggregated_events";
import { eventMeta } from "./event_meta";
import { events } from "./events";
import { tenant } from "./tenant";
import { user } from "./user";

export const teamspace = pgTable("Teamspace", {
  id: serial("id").notNull().primaryKey(),
  tenant_id: serial("tenant_id").references(() => tenant.id),
  name: varchar("name").notNull(),
});

//one to many relationship for tenant to teamspace, one tenant for multiple teamspace
export const teamspaceRelations = relations(teamspace, ({ one, many }) => ({
  tenant: one(tenant, {
    fields: [teamspace.tenant_id],
    references: [tenant.id],
  }),
  user: many(user),
  events: many(events),
  event_meta: many(eventMeta),
  aggregated_events: many(aggregatedEvents),
}));

export const insertTeamspaceSchema = createInsertSchema(teamspace);

export const selectTeamspaceSchema = createSelectSchema(teamspace);

export type TTeamspace = z.infer<typeof selectTeamspaceSchema>;

export type TInsertTeamspace = z.infer<typeof insertTeamspaceSchema>;
