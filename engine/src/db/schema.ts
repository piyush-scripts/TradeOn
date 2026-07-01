import {
    pgTable,
    integer,
    varchar,
    timestamp,
    primaryKey,
    pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Enums ───────────────────────────────────────────────

export const marketStatusEnum = pgEnum("market_status", ["open", "resolved"]);
export const orderSideEnum = pgEnum("order_side", ["YES", "NO"]);
export const orderStatusEnum = pgEnum("order_status", [
    "pending",
    "filled",
    "partially_filled",
    "canceled",
]);
export const txTypeEnum = pgEnum("tx_type", ["deposit", "trade", "withdrawal"]);

// ─── Users ───────────────────────────────────────────────

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    clerkId: varchar("userid", { length: 255 }).notNull().unique(),
    email: varchar("email", { length: 255 }).unique(),
    balanceCents: integer("balance").notNull().default(5000000), // Default 50k
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
    orders: many(orders),
    transactions: many(transactions),
    positions: many(positions),
}));

// ─── Markets ─────────────────────────────────────────────

export const markets = pgTable("markets", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    question: varchar("question", { length: 512 }).notNull(),
    imageUri: varchar("image_uri", { length: 1024 }),
    status: marketStatusEnum("status").notNull().default("open"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const marketsRelations = relations(markets, ({ many }) => ({
    orders: many(orders),
    positions: many(positions),
}));

// ─── Orders ──────────────────────────────────────────────

export const orders = pgTable("orders", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id").notNull().references(() => users.id),
    marketId: integer("market_id").notNull().references(() => markets.id),
    side: orderSideEnum("side").notNull(),
    priceCents: integer("price_cents").notNull(), // 0-10000 (0.00 to 100.00)
    quantity: integer("quantity").notNull(),
    filledQty: integer("filled_qty").notNull().default(0),
    status: orderStatusEnum("status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
    user: one(users, { fields: [orders.userId], references: [users.id] }),
    market: one(markets, { fields: [orders.marketId], references: [markets.id] }),
    transactions: many(transactions),
}));

// ─── Transactions ────────────────────────────────────────

export const transactions = pgTable("transactions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    orderId: integer("order_id").references(() => orders.id),
    userId: integer("user_id").notNull().references(() => users.id),
    amountChangeCents: integer("amount_change_cents").notNull(),
    type: txTypeEnum("type").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
    order: one(orders, {
        fields: [transactions.orderId],
        references: [orders.id],
    }),
    user: one(users, {
        fields: [transactions.userId],
        references: [users.id],
    }),
}));

// ─── Positions ───────────────────────────────────────────

export const positions = pgTable(
    "positions",
    {
        userId: integer("user_id")
            .notNull()
            .references(() => users.id),
        marketId: integer("market_id")
            .notNull()
            .references(() => markets.id),
        sharesYes: integer("shares_yes").notNull().default(0),
        sharesNo: integer("shares_no").notNull().default(0),
    },
    (table) => [primaryKey({ columns: [table.userId, table.marketId] })]
);

export const positionsRelations = relations(positions, ({ one }) => ({
    user: one(users, { fields: [positions.userId], references: [users.id] }),
    market: one(markets, {
        fields: [positions.marketId],
        references: [markets.id],
    }),
}));
