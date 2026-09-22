"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { Activity, Clock, TrendingUp, Wallet } from "lucide-react";
import { ENGINE_URL } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardToolbar } from "@/components/ui/card";
import { useUserPortfolio } from "@/hooks/useUserPortfolio";

const markets = [
  { id: 1, question: "Will Bitcoin reach $100k by December 2026?", volume: "₹14.2M", category: "Crypto", resolveDate: "Dec 31" },
  { id: 2, question: "Will AI pass the Turing test in 2026?", volume: "₹8.5M", category: "Tech", resolveDate: "Dec 31" },
  { id: 3, question: "Will the Fed cut interest rates in Q4?", volume: "₹22.1M", category: "Economy", resolveDate: "Oct 15" },
  { id: 4, question: "Will GTA 6 release on schedule?", volume: "₹5.6M", category: "Culture", resolveDate: "Nov 30" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [liveProbabilities, setLiveProbabilities] = useState<Record<number, number>>({
    1: 50,
    2: 50,
    3: 50,
    4: 50,
  });

  const { getPosition, balance } = useUserPortfolio();

  const fetchLiveProbabilities = useCallback(async () => {
    try {
      const updates: Record<number, number> = {};
      await Promise.all(
        markets.map(async (m) => {
          try {
            const res = await fetch(`${ENGINE_URL}/api/orders/orderbook/${m.id}`);
            if (res.ok) {
              const data = await res.json();
              const topYesBid = data.yesOrders?.[0]?.price;
              const topNoBid = data.noOrders?.[0]?.price;

              let yesProb = 50;
              if (topYesBid !== undefined && topNoBid !== undefined) {
                const impliedYesAsk = 100 - topNoBid;
                yesProb = Math.round((topYesBid + impliedYesAsk) / 2);
              } else if (topYesBid !== undefined) {
                yesProb = topYesBid;
              } else if (topNoBid !== undefined) {
                yesProb = 100 - topNoBid;
              }

              updates[m.id] = Math.max(1, Math.min(99, yesProb));
            }
          } catch (e) {
            console.error(`Failed to fetch orderbook for market #${m.id}`, e);
          }
        })
      );

      if (Object.keys(updates).length > 0) {
        setLiveProbabilities((prev) => ({ ...prev, ...updates }));
      }
    } catch (err) {
      console.error("Error fetching live homepage probabilities:", err);
    }
  }, []);

  useEffect(() => {
    fetchLiveProbabilities();
    const interval = setInterval(fetchLiveProbabilities, 3000);
    return () => clearInterval(interval);
  }, [fetchLiveProbabilities]);

  const categories = ["All", "Crypto", "Politics", "Tech", "Sports", "Economy", "Culture"];

  const filteredMarkets = useMemo(() => {
    if (selectedCategory === "All") return markets;
    return markets.filter(m => m.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  return (
    <div className="grid gap-8 pb-8">
      <section className="grid gap-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" appearance="outline" className="w-fit">Live markets</Badge>
          {balance !== null && (
            <span className="text-xs font-mono font-medium text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 inline-flex items-center gap-1.5">
              <Wallet className="size-3.5" /> Balance: ₹{(balance / 100).toFixed(2)}
            </span>
          )}
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Trade event outcomes</h1>
            <p className="max-w-2xl text-muted-foreground">
              Minimal prediction markets with live order books, simple pricing, and ₹1 payout shares.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/portfolio">View portfolio</Link>
          </Button>
        </div>
      </section>

      <section className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => (
          <Button 
            key={category} 
            variant={selectedCategory === category ? "secondary" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </section>

      <section className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight">
            <Activity className="size-5" /> Markets
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMarkets.map((market) => {
            const pos = getPosition(market.id);
            const sharesYes = pos?.sharesYes || 0;
            const sharesNo = pos?.sharesNo || 0;
            const hasPosition = sharesYes > 0 || sharesNo > 0;
            const probYes = liveProbabilities[market.id] ?? 50;

            return (
              <Link href={`/market/${market.id}`} key={market.id}>
                <Card className={`h-full transition-colors hover:bg-muted/40 relative ${hasPosition ? "border-emerald-500/40" : ""}`}>
                  <CardHeader>
                    <CardToolbar className="w-full justify-between flex-wrap gap-1.5">
                      <Badge variant="outline" appearance="outline">{market.category}</Badge>
                      <div className="flex items-center gap-2">
                        {sharesYes > 0 && (
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[11px]">
                            {sharesYes} YES
                          </Badge>
                        )}
                        {sharesNo > 0 && (
                          <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/20 text-[11px]">
                            {sharesNo} NO
                          </Badge>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3.5" /> {market.resolveDate}
                        </span>
                      </div>
                    </CardToolbar>
                    <CardTitle className="line-clamp-2 text-base leading-6">{market.question}</CardTitle>
                    <CardDescription className="inline-flex items-center gap-1">
                      <TrendingUp className="size-3.5" /> Volume {market.volume}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-3xl font-semibold tabular-nums text-emerald-500">{probYes}%</div>
                        <div className="text-xs text-muted-foreground font-medium">YES</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-medium tabular-nums text-rose-500">{100 - probYes}%</div>
                        <div className="text-xs text-muted-foreground font-medium">NO</div>
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-rose-500/20">
                      <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${probYes}%` }} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
