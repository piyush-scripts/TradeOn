import { clerkMiddleware, requireAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";

/**
 * Clerk middleware for Express.
 * Attach to the Express app with `app.use(clerkAuth)`.
 * Then protect individual routes with `requireClerkAuth`.
 */
export const clerkAuth = clerkMiddleware();

/**
 * Route-level middleware that rejects unauthenticated requests.
 * Usage: `router.post("/orders", requireClerkAuth, handler)`
 */
export const requireClerkAuth = requireAuth({
    signInUrl: "/sign-in",
});

/**
 * Helper to extract the Clerk userId from a request.
 * Must be used after `requireClerkAuth` middleware.
 */
export function getClerkUserId(req: Request): string | null {
    const auth = (req as any).auth;
    return auth?.userId ?? null;
}
