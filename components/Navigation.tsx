"use client";

import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { BarChart2, Briefcase, Home, Search, TrendingUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ENGINE_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";

export function TopNav() {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);

  const refetchBalance = useCallback(async () => {
    if (!isSignedIn) return;
    try {
      const token = await getToken();
      const res = await fetch(`${ENGINE_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data && typeof data.balance === "number") setBalance(data.balance);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  }, [getToken, isSignedIn]);

  useEffect(() => {
    if (!isSignedIn) return;
    refetchBalance();
    window.addEventListener("balance-update", refetchBalance);
    return () => window.removeEventListener("balance-update", refetchBalance);
  }, [isSignedIn, refetchBalance]);

  const formattedBalance = balance !== null
    ? `₹${(balance / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "Loading";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
        <div className="flex min-w-0 items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-md border bg-card">
              <TrendingUp className="size-4" />
            </span>
            <span className="hidden text-base sm:inline">TradeOn</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink href="/" icon={<Home />} label="Home" />
            <NavLink href="/" icon={<BarChart2 />} label="Markets" />
            <NavLink href="/portfolio" icon={<Briefcase />} label="Portfolio" />
          </nav>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <div className="relative hidden w-64 lg:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-8" placeholder="Search markets" />
          </div>

          {isLoaded && isSignedIn ? (
            <div className="hidden items-end sm:flex sm:flex-col">
              <span className="text-xs text-muted-foreground">Available</span>
              <span className="text-sm font-medium tabular-nums">{formattedBalance}</span>
            </div>
          ) : null}

          <ThemeToggle />

          {isLoaded && isSignedIn ? (
            <UserButton appearance={{ elements: { userButtonAvatarBox: "h-8 w-8" } }} />
          ) : isLoaded ? (
            <Button asChild size="md" variant="primary">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          ) : (
            <div className="h-8 w-16 rounded-md bg-muted" />
          )}
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur md:hidden">
      <nav className="mx-auto grid h-16 max-w-md grid-cols-3 px-3">
        <MobileNavLink href="/" icon={<Home />} label="Home" />
        <MobileNavLink href="/" icon={<BarChart2 />} label="Markets" />
        <MobileNavLink href="/portfolio" icon={<Briefcase />} label="Portfolio" />
      </nav>
    </div>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Button asChild variant={isActive ? "secondary" : "ghost"} size="md">
      <Link href={href} className="gap-2">
        <span className="[&_svg]:size-4">{icon}</span>
        {label}
      </Link>
    </Button>
  );
}

function MobileNavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-1 text-xs transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`}
    >
      <span className="[&_svg]:size-5">{icon}</span>
      {label}
    </Link>
  );
}
