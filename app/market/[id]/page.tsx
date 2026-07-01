"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { LiveOrderBook } from "@/components/LiveOrderBook";
import { Activity, Info, Trophy, Link as LinkIcon, DollarSign } from "lucide-react";

export default function MarketDetailPage() {
    const { id } = useParams();
    const marketId = parseInt(id as string, 10) || 1;
    const { getToken } = useAuth();
    const [side, setSide] = useState<"YES" | "NO">("YES");
    const [price, setPrice] = useState("50");
    const [shares, setShares] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [book, setBook] = useState<{ yesOrders: any[], noOrders: any[] }>({ yesOrders: [], noOrders: [] });

    // Calculate dynamic probability percentage based on best YES price (default to 65%)
    const bestYesPrice = book.yesOrders && book.yesOrders.length > 0 ? (book.yesOrders[0].priceCents / 100) : 65;
    const probability = Math.round(bestYesPrice);

    const handleTrade = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = await getToken();
            const res = await fetch("http://localhost:4000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    marketId: marketId,
                    priceCents: parseInt(price, 10),
                    quantity: parseInt(shares, 10),
                    side: side,
                })
            });

            const content = await res.json();
            if (!res.ok) {
                throw new Error(content.error || "Failed to submit order");
            }

            alert("Order placed successfully!");
            setShares("");
            // Dispatch event to trigger navbar balance update
            window.dispatchEvent(new Event("balance-update"));
        } catch (err: any) {
            console.error("Order submission failed:", err);
            setError(err.message || "Failed to connect to server");
            alert(err.message || "Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">

            {/* Header Info */}
            <section className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-white/5 text-slate-300 text-xs font-semibold uppercase tracking-widest mb-4">
                            Market ID: #{marketId}
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight leading-tight mb-4">
                            Will Bitcoin reach $100k by December 2026?
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-emerald-400" /> ₹14.2M Vol</span>
                            <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-blue-400" /> Resolves Dec 31, 2026</span>
                            <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors"><LinkIcon className="w-4 h-4" /> Source</a>
                        </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end p-4 bg-black/20 rounded-2xl border border-white/5 min-w-[200px]">
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Live Probability</span>
                        <span className="text-5xl font-bold text-emerald-400 font-serif tracking-tighter">
                            {probability}<span className="text-3xl text-emerald-500/50">%</span>
                        </span>
                        <span className="text-xs text-emerald-500 font-medium mt-1">YES Side</span>
                    </div>
                </div>
            </section>

            {/* Main Trading Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column (Chart/Rules) */}
                <div className="lg:col-span-8 flex flex-col gap-8">

                    {/* Chart Mock */}
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4 z-10">
                            <h3 className="text-lg font-bold text-white">Price History</h3>
                            <div className="flex gap-2">
                                {["1H", "1D", "1W", "ALL"].map(t => (
                                    <button key={t} className="px-3 py-1 rounded bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">{t}</button>
                                ))}
                            </div>
                        </div>
                        {/* Simple SVG Chart Mock */}
                        <div className="flex-1 w-full flex items-end justify-between gap-1 opacity-50 relative z-10">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div key={i} className="w-full bg-emerald-500/40 rounded-t-sm" style={{ height: `${20 + Math.random() * 60}%` }} />
                            ))}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Rules */}
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-400" />
                            Rules & Resolution
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            This market will resolve to &quot;YES&quot; if the official spot price of Bitcoin reaches $100,000 USD or higher at any point before December 31, 2026, 11:59 PM ET, according to the official Binance BTC/USDT price index. Otherwise, it will resolve to &quot;NO&quot;. Upon resolution, winning shares payout at exactly ₹100.00 each.
                        </p>
                    </div>
                </div>

                {/* Right Column (Trade Widget & Orderbook) */}
                <div className="lg:col-span-4 flex flex-col gap-6">

                    {/* Trade Widget */}
                    <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="flex w-full">
                            <button
                                onClick={() => setSide("YES")}
                                className={`flex-1 py-4 text-center font-bold tracking-wide transition-all ${side === "YES" ? "bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500" : "bg-black/20 text-slate-500 hover:bg-black/40 hover:text-slate-300"
                                    }`}
                            >
                                Buy YES
                            </button>
                            <button
                                onClick={() => setSide("NO")}
                                className={`flex-1 py-4 text-center font-bold tracking-wide transition-all ${side === "NO" ? "bg-rose-500/10 text-rose-400 border-b-2 border-rose-500" : "bg-black/20 text-slate-500 hover:bg-black/40 hover:text-slate-300"
                                    }`}
                            >
                                Buy NO
                            </button>
                        </div>

                        <form onSubmit={handleTrade} className="p-6 flex flex-col gap-5">
                            <div>
                                <label className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                    Limit Price (₹)
                                    <span className="text-slate-600">0 - 100</span>
                                </label>
                                <div className="relative">
                                    <DollarSign className={`absolute left-3 top-3 h-5 w-5 ${side === "YES" ? "text-emerald-500" : "text-rose-500"}`} />
                                    <input
                                        type="number"
                                        min="1" max="99"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white font-bold tracking-widest focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                    Shares
                                    <span className="text-slate-600">Max 10k</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter amount..."
                                    min="1"
                                    value={shares}
                                    onChange={(e) => setShares(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white font-bold tracking-widest focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                                    required
                                />
                            </div>

                            <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4 mt-2">
                                <span className="text-slate-400 font-medium">Potential Payout</span>
                                <span className="text-emerald-400 font-bold font-mono text-lg">
                                    ₹{shares ? (parseInt(shares) * 100).toLocaleString() : "0"}
                                </span>
                            </div>

                            <button
                                type="submit"
                                className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${side === "YES" ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20" : "bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-rose-500/20"
                                    }`}
                            >
                                Place Order
                            </button>
                        </form>
                    </div>

                    {/* Live Order Book */}
                    <LiveOrderBook marketId={marketId} onBookUpdate={setBook} />

                </div>
            </div>
        </div>
    );
}
