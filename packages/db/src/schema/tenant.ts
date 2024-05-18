import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { teamspace } from "./teamspace";

export const tenant = pgTable("Tenant", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name").notNull(),
});

// one to many relationship for tenant to teamspace, one tenant for multiple teamspace
export const tenantRelations = relations(tenant, ({ many }) => ({
  teamspace: many(teamspace),
}));

export const insertTenantSchema = createInsertSchema(tenant);

export const selectTenantSchema = createSelectSchema(tenant);

export type TTenant = z.infer<typeof selectTenantSchema>;

export type TInsertTenant = z.infer<typeof insertTenantSchema>;
