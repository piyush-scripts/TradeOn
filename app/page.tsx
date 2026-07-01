"use client";

import Link from "next/link";
import { TrendingUp, Flame, Activity, Clock, Zap } from "lucide-react";

// Mock Active Markets
const markets = [
  {
    id: 1,
    question: "Will Bitcoin reach $100k by December 2026?",
    probabilityYes: 65,
    volume: "₹14.2M",
    category: "Crypto",
    resolveDate: "Dec 31",
  },
  {
    id: 2,
    question: "Will AI pass the Turing test in 2026?",
    probabilityYes: 32,
    volume: "₹8.5M",
    category: "Tech",
    resolveDate: "Dec 31",
  },
  {
    id: 3,
    question: "Will the Fed cut interest rates in Q4?",
    probabilityYes: 88,
    volume: "₹22.1M",
    category: "Economy",
    resolveDate: "Oct 15",
  },
  {
    id: 4,
    question: "Will GTA 6 release on schedule?",
    probabilityYes: 45,
    volume: "₹5.6M",
    category: "Pop Culture",
    resolveDate: "Nov 30",
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-20 hidden md:block">
          <Zap className="w-64 h-64 text-blue-500 blur-3xl mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Flame className="w-4 h-4" />
            <span>Trending Ecosystem</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-[1.1] mb-6">
            Trade your opinions. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Profit from reality.
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-xl">
            The fastest execution engine for trading global events. Secure your position and let reality determine the outcome.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section>
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {["All Markets", "Crypto", "Politics", "Tech", "Sports", "Economy"].map((cat, i) => (
            <button
              key={cat}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${i === 0
                  ? "bg-white text-slate-950"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Market Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Live Markets
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {markets.map((market) => (
            <Link href={`/market/${market.id}`} key={market.id}>
              <div className="group relative bg-slate-900 border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 hover:bg-slate-800/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] overflow-hidden flex flex-col h-full cursor-pointer">
                {/* Glow effect on hover */}
                <div className="absolute -inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-white/5 px-2.5 py-1 rounded-md">
                    {market.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    {market.resolveDate}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-100 mb-6 leading-snug group-hover:text-white transition-colors">
                  {market.question}
                </h3>

                <div className="mt-auto">
                  <div className="flex items-end justify-between mb-2">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-emerald-400 tracking-tight">
                        {market.probabilityYes}%
                      </span>
                      <span className="text-xs text-emerald-400/70 font-medium">YES</span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-rose-400">
                        {100 - market.probabilityYes}%
                      </span>
                      <span className="text-xs text-rose-400/70 font-medium">NO</span>
                    </div>
                  </div>

                  {/* Prob Bar */}
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-1000 ease-out"
                      style={{ width: `${market.probabilityYes}%` }}
                    />
                    <div
                      className="h-full bg-rose-500 transition-all duration-1000 ease-out"
                      style={{ width: `${100 - market.probabilityYes}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Vol: {market.volume}
                    </div>
                    <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      Trade Now →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
