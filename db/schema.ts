import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 512 }).notNull(),
  balance: integer().notNull().default(50000),
  email: varchar({ length: 255 }).unique(),
});

export const usersRelations = relations(users, ({ many }) => ({
  refreshTokens: many(RefreshTokens),
}));

export const RefreshTokens = pgTable("user_refresh_tokens", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userName: varchar({ length: 255 }).notNull(),
  token: varchar({ length: 255 }).notNull(),
  userAgent: varchar({ length: 255 }),
  userIp: varchar({ length: 255 }),
});

export const refreshTokensRelations = relations(RefreshTokens, ({ one }) => ({
  user: one(users, {
    fields: [RefreshTokens.userName],
    references: [users.name],
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
    userName: varchar({length:255}).notNull(),
    quantity: integer().notNull(),
    itemSupporting: varchar().notNull(),
});

export const holdingsRelations = relations(Holdings, ({ one }) => ({
  item: one(Items, {
    fields: [Holdings.itemId],
    references: [Items.id],
  }),
  user: one(users, {
    fields: [Holdings.userName],
    references: [users.name],
  }),
}));

