"use client";

import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Search, Home, BarChart2, Briefcase, TrendingUp } from "lucide-react";
import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";

export function TopNav() {
    const { isSignedIn, isLoaded, getToken } = useAuth();
    const [balance, setBalance] = useState<number | null>(null);

    const refetchBalance = async () => {
        try {
            const token = await getToken();
            const res = await fetch("http://localhost:4000/api/users/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data && typeof data.balance === 'number') {
                setBalance(data.balance);
            }
        } catch (err) {
            console.error("Error fetching balance:", err);
        }
    };

    useEffect(() => {
        if (isSignedIn) {
            refetchBalance();
            window.addEventListener("balance-update", refetchBalance);
        }
        return () => {
            window.removeEventListener("balance-update", refetchBalance);
        };
    }, [isSignedIn]);

    const formattedBalance = balance !== null
        ? `₹${(balance / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "Loading...";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
            <div className="flex h-16 items-center px-4 md:px-8 mx-auto max-w-7xl justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white hidden sm:inline-block">
                            TradeOn
                        </span>
                    </Link>

                    {/* Nav Links (Desktop) */}
                    <nav className="hidden md:flex items-center gap-6 ml-6">
                        <NavLink href="/" icon={<Home className="h-4 w-4" />} label="Home" />
                        <NavLink href="/" icon={<BarChart2 className="h-4 w-4" />} label="Markets" />
                        <NavLink href="/portfolio" icon={<Briefcase className="h-4 w-4" />} label="Portfolio" />
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search markets..."
                            className="h-9 w-64 rounded-full border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        {isLoaded && isSignedIn ? (
                            <>
                                <div className="hidden sm:flex flex-col items-end">
                                    <span className="text-xs text-slate-400">Available Cash</span>
                                    <span className="text-sm font-semibold text-emerald-400">{formattedBalance}</span>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center ring-2 ring-white/5 cursor-pointer hover:ring-blue-500 transition-all overflow-hidden">
                                    <UserButton appearance={{ elements: { userButtonAvatarBox: "h-8 w-8" } }} />
                                </div>
                            </>
                        ) : isLoaded ? (
                            <Link href="/sign-in" className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
                                Sign In
                            </Link>
                        ) : (
                            <div className="w-16 h-8 bg-white/5 animate-pulse rounded-full" />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export function BottomNav() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-slate-950/90 backdrop-blur-lg pb-safe">
            <nav className="flex h-16 items-center justify-between px-6">
                <MobileNavLink href="/" icon={<Home className="h-5 w-5" />} label="Home" />
                <MobileNavLink href="/" icon={<BarChart2 className="h-5 w-5" />} label="Markets" />
                <MobileNavLink href="/portfolio" icon={<Briefcase className="h-5 w-5" />} label="Portfolio" />
            </nav>
        </div>
    );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? "text-blue-400" : "text-slate-400 hover:text-slate-200"
                }`}
        >
            {icon}
            {label}
        </Link>
    );
}

function MobileNavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${isActive ? "text-blue-400" : "text-slate-400"
                }`}
        >
            {icon}
            <span className="text-[10px] font-medium">{label}</span>
        </Link>
    );
}
