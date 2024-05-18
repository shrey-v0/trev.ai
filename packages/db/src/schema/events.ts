import { relations } from "drizzle-orm";
import { integer, pgTable, serial, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { EventTypes } from "./enums";
import { eventMeta } from "./event_meta";
import { teamspace } from "./teamspace";
import { user } from "./user";

export const events = pgTable("Events", {
  id: serial("id").notNull().primaryKey(),
  user_id: integer("user_id").references(() => user.id),
  teamspace_id: integer("teamspace_id").references(() => teamspace.id),
  key: uuid("key").notNull(),
  event_type: EventTypes("event_type").references(() => eventMeta.event_type),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const eventRelations = relations(events, ({ one }) => ({
  user: one(user, {
    fields: [events.user_id],
    references: [user.id],
  }),
  teamspace: one(teamspace, {
    fields: [events.teamspace_id],
    references: [teamspace.id],
  }),
  event_meta: one(eventMeta, {
    fields: [events.event_type],
    references: [eventMeta.event_type],
  }),
}));

export const insertEventSchema = createInsertSchema(events);

export const selectEventSchema = createSelectSchema(events);

export type TEvent = z.infer<typeof selectEventSchema>;

export type TInsertEvent = z.infer<typeof insertEventSchema>;
