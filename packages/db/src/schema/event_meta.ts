import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { aggregatedEvents } from "./aggregated_events";
import { EventTypes } from "./enums";
import { events } from "./events";
import { teamspace } from "./teamspace";

export const eventMeta = pgTable("EventMeta", {
  event_type: EventTypes("event_type").notNull().primaryKey().unique(),
  teamspace_id: integer("teamspace_id").references(() => teamspace.id),
  label: varchar("label").notNull(),
  fill_color: varchar("fill_color").notNull(),
});

export const eventMetaRelations = relations(eventMeta, ({ one, many }) => ({
  teamspace: one(teamspace, {
    fields: [eventMeta.teamspace_id],
    references: [teamspace.id],
  }),
  events: many(events),
  aggregated_events: many(aggregatedEvents),
}));

export const selectEventMetaSchema = createSelectSchema(eventMeta);

export const insertEventMetaSchema = createInsertSchema(eventMeta);

export type TEventMeta = z.infer<typeof selectEventMetaSchema>;

export type TInsertEventMeta = z.infer<typeof insertEventMetaSchema>;
