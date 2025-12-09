import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, timestamp, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userid: varchar().notNull().unique(),
  balance: integer("balance").notNull().default(50000),
  email: varchar({ length: 255 }).unique(),
  createdAt: timestamp({ withTimezone: true, mode: "string" }).defaultNow()
},
  (table) => ([check("non_negative_amount",sql`${table.balance} >= 0`)])
);

export const usersRelations = relations(users, ({ many }) => ({
  refreshTokens: many(RefreshTokens),
}));

export const RefreshTokens = pgTable("user_refresh_tokens", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userName: varchar({ length: 255 }).notNull(),
  token: varchar({ length: 255 }).notNull(),
  userAgent: varchar({ length: 255 }),
  userIp: varchar({ length: 255 }),
  createdAt: timestamp({ withTimezone: true, mode: "string" }).defaultNow()
});

export const refreshTokensRelations = relations(RefreshTokens, ({ one }) => ({
  user: one(users, {
    fields: [RefreshTokens.userName],
    references: [users.userid],
  }),
}));

export const Items = pgTable("items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  heading: varchar().notNull(),
  text: varchar(),
  imageUri: varchar().notNull(),
});

export const Holdings = pgTable("holdings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  itemId: integer().notNull(),
  userName: varchar({ length: 255 }).notNull(),
  quantity: integer().notNull(),
  status: varchar({ length: 10 }),
  itemSupporting: varchar().notNull(),
  createdAt: timestamp({ withTimezone: true, mode: "string" }).defaultNow()
},
  (table) => (["non_negatice_quantity" , sql`${table.quantity} >= 0`])
);

export const holdingsRelations = relations(Holdings, ({ one }) => ({
  item: one(Items, {
    fields: [Holdings.itemId],
    references: [Items.id],
  }),
  user: one(users, {
    fields: [Holdings.userName],
    references: [users.userid],
  }),
}));

