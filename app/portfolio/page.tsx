"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { ENGINE_URL } from "@/lib/config";
import { Briefcase, CreditCard, PieChart, Clock, ArrowUpRight, ArrowDownRight, User } from "lucide-react";

interface Position {
    marketId: number;
    sharesYes: number;
    sharesNo: number;
    question: string;
}

interface OpenOrder {
    id: string;
    marketId: number;
    side: "YES" | "NO";
    price: number;
    quantity: number;
    filledQty: number;
    status: string;
    question: string;
    createdAt: string;
}

interface PortfolioData {
    balance: number;
    reservedBalance: number;
    positions: Position[];
}

export default function PortfolioPage() {
    const { isLoaded, isSignedIn, getToken } = useAuth();
    const [data, setData] = useState<PortfolioData | null>(null);
    const [openOrders, setOpenOrders] = useState<OpenOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPortfolio() {
            try {
                const token = await getToken();
                const [portRes, ordRes] = await Promise.all([
                    fetch(`${ENGINE_URL}/api/users/me/portfolio`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    }),
                    fetch(`${ENGINE_URL}/api/users/me/orders`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                ]);

                if (portRes.ok && ordRes.ok) {
                    const portData = await portRes.json();
                    const ordData = await ordRes.json();
                    setData(portData);
                    setOpenOrders(ordData);
                }
            } catch (err) {
                console.error("Failed to load portfolio:", err);
            } finally {
                setLoading(false);
            }
        }

        if (isLoaded && isSignedIn) {
            loadPortfolio();
        } else if (isLoaded && !isSignedIn) {
            setLoading(false);
        }
    }, [isLoaded, isSignedIn, getToken]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-400 font-medium">Loading portfolio...</p>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-900 border border-white/10 rounded-2xl p-8 text-center text-white">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Access Portfolio</h2>
                <p className="text-slate-400 max-w-sm mb-6">Please sign in to view your holdings, active positions, and open orders.</p>
            </div>
        );
    }

    const availableCash = data ? data.balance / 100 : 0;
    const investedCash = data ? data.reservedBalance / 100 : 0;
    const totalValue = availableCash + investedCash;

    // Filter positions to only show ones where the user actually holds shares
    const activePositions = data
        ? data.positions.filter(p => p.sharesYes > 0 || p.sharesNo > 0)
        : [];

    return (
        <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500 text-white">
            <h1 className="text-3xl font-bold font-serif tracking-tight">Portfolio Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-medium text-slate-400">Total Portfolio Value</span>
                        <div className="text-blue-500/50 bg-blue-500/10 p-2 rounded-lg"><Briefcase className="w-5 h-5" /></div>
                    </div>
                    <div className="text-3xl font-bold tracking-tight">₹{totalValue.toFixed(2)}</div>
                </div>

                <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-medium text-slate-400">Available Cash</span>
                        <div className="text-emerald-500/50 bg-emerald-500/10 p-2 rounded-lg"><CreditCard className="w-5 h-5" /></div>
                    </div>
                    <div className="text-3xl font-bold tracking-tight">₹{availableCash.toFixed(2)}</div>
                </div>

                <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-medium text-slate-400">Reserved in Orders</span>
                        <div className="text-purple-500/50 bg-purple-500/10 p-2 rounded-lg"><PieChart className="w-5 h-5" /></div>
                    </div>
                    <div className="text-3xl font-bold tracking-tight">₹{investedCash.toFixed(2)}</div>
                </div>
            </div>

            {/* Active Positions Table */}
            <section className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl mt-4">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-blue-400" />
                        Active Positions
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    {activePositions.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 font-medium italic">
                            You do not own any contract shares right now.
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-black/20 text-slate-400 uppercase text-[10px] tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Market / Question</th>
                                    <th className="px-6 py-4 font-semibold text-center">Outcome Side</th>
                                    <th className="px-6 py-4 font-semibold text-right font-mono">Shares Owned</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                                {activePositions.map((pos) => {
                                    const side = pos.sharesYes > 0 ? "YES" : "NO";
                                    const count = pos.sharesYes > 0 ? pos.sharesYes : pos.sharesNo;
                                    return (
                                        <tr key={pos.marketId} className="hover:bg-white/5 transition-colors group cursor-pointer">
                                            <td className="px-6 py-4 text-white border-l-2 border-transparent group-hover:border-blue-500 transition-colors">
                                                {pos.question}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider ${side === "YES" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                                                    {side}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-mono text-white">{count}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            {/* Open Orders */}
            <section className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl mt-4">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-slate-400" />
                        Open Orders
                    </h2>
                </div>
                {openOrders.length === 0 ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center mb-4">
                            <Clock className="w-8 h-8 text-slate-500" />
                        </div>
                        <p className="text-slate-400 font-medium">You have no open orders right now.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-black/20 text-slate-400 uppercase text-[10px] tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Market / Question</th>
                                    <th className="px-6 py-4 font-semibold text-center">Side</th>
                                    <th className="px-6 py-4 font-semibold text-right font-mono">Limit Price</th>
                                    <th className="px-6 py-4 font-semibold text-right font-mono">Quantity</th>
                                    <th className="px-6 py-4 font-semibold text-right font-mono">Filled Qty</th>
                                    <th className="px-6 py-4 font-semibold text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                                {openOrders.map((ord) => (
                                    <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 text-white">{ord.question}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider ${ord.side === "YES" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                                                {ord.side}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono">₹{(ord.price / 100).toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right font-mono">{ord.quantity}</td>
                                        <td className="px-6 py-4 text-right font-mono">{ord.filledQty}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs uppercase font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">
                                                {ord.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}
