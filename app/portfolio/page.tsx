"use client";

import { Briefcase, CreditCard, PieChart, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

export default function PortfolioPage() {
    return (
        <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-white font-serif tracking-tight">Portfolio Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Portfolio Value", value: "₹84,520.00", icon: <Briefcase className="w-5 h-5" />, trend: "+12.5%" },
                    { label: "Available Cash", value: "₹50,000.00", icon: <CreditCard className="w-5 h-5" />, trend: null },
                    { label: "Total Invested", value: "₹34,520.00", icon: <PieChart className="w-5 h-5" />, trend: null },
                    { label: "Unrealized PnL", value: "+ ₹4,210.00", icon: <TrendingUp className="w-5 h-5 text-emerald-400" />, trend: "+8.2%" },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-medium text-slate-400">{stat.label}</span>
                            <div className="text-blue-500/50 bg-blue-500/10 p-2 rounded-lg">{stat.icon}</div>
                        </div>
                        <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                        {stat.trend && (
                            <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-400">
                                <ArrowUpRight className="w-3 h-3" />
                                {stat.trend} All Time
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Active Positions Table */}
            <section className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl mt-4">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-blue-400" />
                        Active Positions
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-black/20 text-slate-400 uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Market</th>
                                <th className="px-6 py-4 font-semibold">Position</th>
                                <th className="px-6 py-4 font-semibold text-right">Shares</th>
                                <th className="px-6 py-4 font-semibold text-right">Avg Entry</th>
                                <th className="px-6 py-4 font-semibold text-right">Current Price</th>
                                <th className="px-6 py-4 font-semibold text-right">Return</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                            {[
                                { name: "Will Bitcoin reach $100k by December 2026?", pos: "YES", shares: "1,200", avg: "₹52.00", cur: "₹65.00", ret: "+ ₹15,600", positive: true },
                                { name: "Will AI pass the Turing test in 2026?", pos: "NO", shares: "450", avg: "₹64.00", cur: "₹60.00", ret: "- ₹1,800", positive: false }
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors group cursor-pointer">
                                    <td className="px-6 py-4 text-white border-l-2 border-transparent group-hover:border-blue-500 transition-colors">
                                        {row.name.length > 40 ? row.name.slice(0, 40) + "..." : row.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider ${row.pos === "YES" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                                            {row.pos}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono">{row.shares}</td>
                                    <td className="px-6 py-4 text-right font-mono">{row.avg}</td>
                                    <td className="px-6 py-4 text-right font-mono text-white">{row.cur}</td>
                                    <td className={`px-6 py-4 text-right font-mono font-bold ${row.positive ? "text-emerald-400" : "text-rose-400"}`}>
                                        <div className="flex items-center justify-end gap-1">
                                            {row.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                                            {row.ret}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Open Orders */}
            <section className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl mt-4">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-slate-400" />
                        Open Orders
                    </h2>
                </div>
                <div className="p-8 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center mb-4">
                        <Clock className="w-8 h-8 text-slate-500" />
                    </div>
                    <p className="text-slate-400 font-medium">You have no open orders right now.</p>
                </div>
            </section>
        </div>
    );
}
