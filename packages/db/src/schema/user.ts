import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { aggregatedEvents } from "./aggregated_events";
import { UserType } from "./enums";
import { events } from "./events";
import { teamspace } from "./teamspace";

export const user = pgTable("User", {
  id: serial("id").notNull().primaryKey(),
  teamspace_id: integer("teamspace_id").references(() => teamspace.id),
  email: varchar("email").notNull().unique(),
  user_type: UserType("user_type").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(user);

export const selectUserSchema = createSelectSchema(user);

export const userRelations = relations(user, ({ one, many }) => ({
  events: many(events),
  aggregatedEvents: many(aggregatedEvents),
  teamspace: one(teamspace, {
    fields: [user.teamspace_id],
    references: [teamspace.id],
  }),
}));

export type TUser = z.infer<typeof selectUserSchema>;

export type TInsetUser = z.infer<typeof insertUserSchema>;
