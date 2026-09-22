"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Activity, Bot, Info, Link as LinkIcon, Trophy, Zap } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ENGINE_URL } from "@/lib/config";
import { LiveOrderBook } from "@/components/LiveOrderBook";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardToolbar } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserPortfolio } from "@/hooks/useUserPortfolio";

type OrderRecord = {
  orderId: string;
  userId: string;
  price: number;
  quantity: number;
  timestamp: number;
};

type OrderBookData = {
  yesOrders: OrderRecord[];
  noOrders: OrderRecord[];
};

type ChartPoint = {
  timestamp: number;
  time?: string;
  yes: number;
  no: number;
};

const chartConfig = {
  yes: { label: "YES", color: "var(--chart-1)" },
  no: { label: "NO", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function MarketDetailPage() {
  const { id } = useParams();
  const marketId = parseInt(id as string, 10) || 1;
  const { getToken } = useAuth();
  const [side, setSide] = useState<"YES" | "NO">("YES");
  const [price, setPrice] = useState("0.50");
  const [shares, setShares] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [book, setBook] = useState<OrderBookData>({ yesOrders: [], noOrders: [] });
  const [timeframe, setTimeframe] = useState<"1h" | "24h" | "7d" | "30d">("1h");
  const [chartData, setChartData] = useState<ChartPoint[]>([
    { timestamp: Date.now(), yes: 50, no: 50 },
  ]);
  const [botActive, setBotActive] = useState(false);
  const [botLoading, setBotLoading] = useState(false);
  const [resolveLoading, setResolveLoading] = useState(false);
  const [resolveMessage, setResolveMessage] = useState<string | null>(null);

  const fetchHistory = useCallback(async (tf: string) => {
    try {
      const res = await fetch(`${ENGINE_URL}/api/markets/${marketId}/history?timeframe=${tf}`);
      if (res.ok) {
        const data = await res.json();
        if (data.points && data.points.length > 0) {
          setChartData(data.points);
        }
      }
    } catch (e) {
      console.error("Failed to fetch market history:", e);
    }
  }, [marketId]);

  useEffect(() => {
    fetchHistory(timeframe);
  }, [timeframe, fetchHistory]);

  const checkBotStatus = useCallback(async () => {
    try {
      const res = await fetch(`${ENGINE_URL}/api/bots/status/${marketId}`);
      if (res.ok) {
        const data = await res.json();
        setBotActive(data.active);
      }
    } catch (e) {
      console.error("Failed to fetch bot status:", e);
    }
  }, [marketId]);

  const handleBotAction = async (action: "start" | "stop" | "step") => {
    setBotLoading(true);
    try {
      const res = await fetch(`${ENGINE_URL}/api/bots/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marketId, action, count: 5, intervalMs: 2000 }),
      });
      const data = await res.json();
      if (res.ok) {
        setBotActive(data.active);
      }
    } catch (e) {
      console.error("Bot simulation request failed:", e);
    } finally {
      setBotLoading(false);
    }
  };

  const handleResolveMarket = async (outcome: "YES" | "NO") => {
    setResolveLoading(true);
    setResolveMessage(null);
    try {
      const res = await fetch(`${ENGINE_URL}/api/markets/resolve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marketId, outcome }),
      });
      const data = await res.json();
      if (res.ok) {
        setResolveMessage(`Market #${marketId} resolved to ${outcome}! Total payout disbursed: ${data.totalPayoutRupees}`);
        window.dispatchEvent(new Event("balance-update"));
        window.dispatchEvent(new Event("position-update"));
      } else {
        setResolveMessage(data.error || "Resolution failed");
      }
    } catch (e: any) {
      console.error("Market resolution request failed:", e);
      setResolveMessage("Failed to reach server");
    } finally {
      setResolveLoading(false);
    }
  };

  const currentPoint = chartData[chartData.length - 1] ?? { yes: 50, no: 50 };
  const probability = Math.round(currentPoint.yes);
  const noProbability = 100 - probability;

  const bestYesBid = book.yesOrders.length > 0 ? book.yesOrders[0].price : null;
  const bestNoBid = book.noOrders.length > 0 ? book.noOrders[0].price : null;

  const orderCost = useMemo(() => {
    const paise = Math.round(Number(price) * 100);
    const quantity = parseInt(shares, 10);
    if (!Number.isFinite(paise) || !Number.isFinite(quantity)) return 0;
    return (paise * quantity) / 100;
  }, [price, shares]);

  const potentialPayout = useMemo(() => {
    const quantity = parseInt(shares, 10);
    return Number.isFinite(quantity) && quantity > 0 ? quantity : 0;
  }, [shares]);

  const potentialProfit = useMemo(() => {
    return Math.max(0, potentialPayout - orderCost);
  }, [potentialPayout, orderCost]);

  const roiPercent = useMemo(() => {
    if (orderCost <= 0 || potentialProfit <= 0) return 0;
    return (potentialProfit / orderCost) * 100;
  }, [potentialProfit, orderCost]);

  const isPriceInvalid = useMemo(() => {
    const num = Number(price);
    return isNaN(num) || num < 0.01 || num > 1.00;
  }, [price]);

  const handleBookUpdate = useCallback((updatedBook: OrderBookData) => {
    setBook(updatedBook);
    setChartData((current) => {
      let yesProb = 50;

      const topYesBid = updatedBook.yesOrders[0]?.price;
      const topNoBid = updatedBook.noOrders[0]?.price;

      if (topYesBid !== undefined && topNoBid !== undefined) {
        const impliedYesAsk = 100 - topNoBid;
        yesProb = Math.round((topYesBid + impliedYesAsk) / 2);
      } else if (topYesBid !== undefined) {
        yesProb = topYesBid;
      } else if (topNoBid !== undefined) {
        yesProb = 100 - topNoBid;
      } else {
        const previous = current[current.length - 1] ?? { yes: 50, no: 50 };
        yesProb = previous.yes;
      }

      yesProb = Math.max(1, Math.min(99, yesProb));
      const noProb = 100 - yesProb;

      const nextPoint = {
        timestamp: Date.now(),
        yes: yesProb,
        no: noProb,
      };
      return [...current.slice(-39), nextPoint];
    });
  }, []);

  const { balance: userBalance, getPosition } = useUserPortfolio();
  const currentPos = getPosition(marketId);

  const idempotencyKeyRef = useRef<string | null>(null);

  const handleTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double-trigger from rapid double-clicking

    setLoading(true);
    setError(null);

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice < 0.01 || numPrice > 1.00) {
      setError("Limit price must be between ₹0.01 and ₹1.00.");
      setLoading(false);
      return;
    }

    const numShares = parseInt(shares, 10);
    if (isNaN(numShares) || numShares <= 0) {
      setError("Quantity of shares must be a positive integer.");
      setLoading(false);
      return;
    }

    if (userBalance !== null) {
      const userBalRupees = userBalance / 100;
      if (orderCost > userBalRupees) {
        setError(`Insufficient balance. Order cost (₹${orderCost.toFixed(2)}) exceeds available balance (₹${userBalRupees.toFixed(2)}).`);
        setLoading(false);
        return;
      }
    }

    // Reuse active idempotency key for this order attempt to block double-click duplicates at API Gateway
    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current = window.crypto.randomUUID();
    }
    const requestKey = idempotencyKeyRef.current;

    try {
      const token = await getToken();
      const res = await fetch(`${ENGINE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Idempotency-Key": requestKey,
        },
        body: JSON.stringify({
          marketId,
          price: Math.round(Number(price) * 100),
          quantity: parseInt(shares, 10),
          side,
        }),
      });

      const content = await res.json();
      if (!res.ok) throw new Error(content.error || "Failed to submit order");

      // Reset idempotency key for the NEXT new order intent upon success
      idempotencyKeyRef.current = window.crypto.randomUUID();
      setShares("");
      window.dispatchEvent(new Event("balance-update"));
    } catch (err: any) {
      console.error("Order submission failed:", err);
      // Reset key on failure so user can retry placement
      idempotencyKeyRef.current = window.crypto.randomUUID();
      setError(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const formatTick = useCallback((ts: number) => {
    if (!ts) return "";
    const d = new Date(ts);
    if (timeframe === "1h" || timeframe === "24h") {
      return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
    }
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  }, [timeframe]);

  return (
    <div className="grid gap-6 pb-8">
      <Card>
        <CardHeader className="items-start md:flex-row md:items-center">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" appearance="outline">Market #{marketId}</Badge>
              {currentPos && currentPos.sharesYes > 0 && (
                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                  Your Position: {currentPos.sharesYes} YES shares
                </Badge>
              )}
              {currentPos && currentPos.sharesNo > 0 && (
                <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/20">
                  Your Position: {currentPos.sharesNo} NO shares
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl leading-tight sm:text-3xl">Will Bitcoin reach $100k by December 2026?</CardTitle>
              <CardDescription className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-1.5"><Activity className="size-4" /> ₹14.2M volume</span>
                <span className="inline-flex items-center gap-1.5"><Trophy className="size-4" /> Resolves Dec 31, 2026</span>
                <a href="#" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"><LinkIcon className="size-4" /> Source</a>
              </CardDescription>
            </div>
          </div>
          <CardToolbar className="md:ml-auto flex flex-col items-end gap-1.5 min-w-[170px]">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Probability (YES / NO)</div>
              <div className="text-3xl font-semibold tabular-nums">{probability}% / {noProbability}%</div>
            </div>
            <Progress value={probability} className="h-1.5 w-36 [&>div]:bg-emerald-500 bg-rose-500/20" />
          </CardToolbar>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        <div className="grid gap-6 lg:col-span-8 items-start">
          <Card className="h-fit">
            <CardHeader className="pb-3 pt-5 px-6 flex flex-row items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle>Price History</CardTitle>
                <CardDescription>Real-time price probability trend over time (YES vs NO).</CardDescription>
              </div>
              <Tabs value={timeframe} onValueChange={(val) => setTimeframe(val as any)}>
                <TabsList className="h-8 p-0.5 bg-muted/60">
                  <TabsTrigger value="1h" className="text-xs px-2.5 h-7">1H</TabsTrigger>
                  <TabsTrigger value="24h" className="text-xs px-2.5 h-7">24H</TabsTrigger>
                  <TabsTrigger value="7d" className="text-xs px-2.5 h-7">1W</TabsTrigger>
                  <TabsTrigger value="30d" className="text-xs px-2.5 h-7">1M</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pt-4 pb-4 px-4">
              <ChartContainer config={chartConfig} className="h-[240px] aspect-auto w-full">
                <LineChart data={chartData} margin={{ left: 8, right: 12, top: 12, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/40" />
                  <XAxis dataKey="timestamp" hide />
                  <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value}%`} />
                  <ChartTooltip 
                    content={({ active, payload }: any) => {
                      if (!active || !payload || !payload.length) return null;
                      const point = payload[0]?.payload;
                      if (!point) return null;
                      const ts = point.timestamp;
                      const dateStr = ts
                        ? new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true })
                        : "";
                      return (
                        <div className="rounded-lg border border-border/60 bg-popover/95 px-3 py-2 text-xs shadow-md backdrop-blur-sm min-w-[9rem]">
                          <div className="font-mono text-muted-foreground pb-1.5 border-b border-border/40 font-medium">
                            {dateStr}
                          </div>
                          <div className="pt-1.5 space-y-1">
                            <div className="flex items-center justify-between gap-3">
                              <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
                                <span className="size-2 rounded-full bg-emerald-500" /> YES
                              </span>
                              <span className="font-mono font-semibold">{point.yes}%</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span className="flex items-center gap-1.5 text-rose-500 font-medium">
                                <span className="size-2 rounded-full bg-rose-500" /> NO
                              </span>
                              <span className="font-mono font-semibold">{point.no}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    }} 
                  />
                  <Line type="monotone" dataKey="yes" stroke="#10b981" strokeWidth={2.5} dot={false} name="YES" />
                  <Line type="monotone" dataKey="no" stroke="#f43f5e" strokeWidth={2.5} dot={false} name="NO" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2"><Info className="size-4" /> Rules & Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                This market resolves YES if the official spot price of Bitcoin reaches $100,000 USD or higher before December 31, 2026, 11:59 PM ET, according to the Binance BTC/USDT price index. Otherwise, it resolves NO. Winning shares pay exactly ₹1.00 each.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Trade</CardTitle>
              <CardDescription>Limit orders are priced from ₹0.01 to ₹1.00.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrade} className="grid gap-5">
                <Tabs value={side} onValueChange={(val) => setSide(val as "YES" | "NO")} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger 
                      value="YES"
                      className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-500 data-[state=active]:border-emerald-500/20"
                    >
                      Buy YES
                    </TabsTrigger>
                    <TabsTrigger 
                      value="NO"
                      className="data-[state=active]:bg-rose-500/10 data-[state=active]:text-rose-500 data-[state=active]:border-rose-500/20"
                    >
                      Buy NO
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="price">Limit price (₹)</Label>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      side === "YES" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                    }`}>
                      {side} Side
                    </span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Input 
                      id="price" 
                      type="number" 
                      min="0.01" 
                      max="1.00" 
                      step="0.01" 
                      value={price} 
                      onChange={(e) => setPrice(e.target.value)} 
                      required 
                      className={`w-24 font-mono text-center ${isPriceInvalid ? "border-destructive focus-visible:ring-destructive text-destructive" : ""}`}
                    />
                    <div className="flex-1 px-1">
                      <Slider
                        min={1}
                        max={100}
                        step={1}
                        value={[Math.round(Number(price) * 100) || 50]}
                        onValueChange={(val) => setPrice((val[0] / 100).toFixed(2))}
                        className={side === "YES" 
                          ? "[&_[data-slot=slider-range]]:bg-emerald-500 [&_[data-slot=slider-thumb]]:border-emerald-500" 
                          : "[&_[data-slot=slider-range]]:bg-rose-500 [&_[data-slot=slider-thumb]]:border-rose-500"
                        }
                      />
                    </div>
                  </div>
                  {isPriceInvalid && price !== "" && (
                    <p className="text-xs text-destructive font-medium">Limit price must be between ₹0.01 and ₹1.00.</p>
                  )}
                  <p className="text-xs text-muted-foreground">Best {side} bid: {side === "YES" ? (bestYesBid ? `₹${(bestYesBid / 100).toFixed(2)}` : "No open bids") : (bestNoBid ? `₹${(bestNoBid / 100).toFixed(2)}` : "No open bids")}</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="shares">Shares</Label>
                  <Input id="shares" type="number" min="1" placeholder="Enter quantity" value={shares} onChange={(e) => setShares(e.target.value)} required />
                </div>

                <div className="grid gap-2 border-t pt-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estimated cost</span>
                    <span className="font-mono font-medium">₹{orderCost.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Potential payout</span>
                    <span className="font-mono font-medium">₹{potentialPayout.toFixed(2)}</span>
                  </div>
                  {potentialPayout > 0 && orderCost > 0 && (
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-dashed">
                      <span className="text-muted-foreground">Potential profit (ROI)</span>
                      <span className="font-mono text-emerald-500 font-semibold">
                        +₹{potentialProfit.toFixed(2)} ({roiPercent.toFixed(1)}%)
                      </span>
                    </div>
                  )}
                </div>

                {error ? <p className="text-sm text-destructive">{error}</p> : null}

                <Button type="submit" disabled={loading}>
                  {loading ? "Placing..." : "Place order"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader className="pt-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Bot className="size-4 text-emerald-500" /> Bot Order Generator
                </CardTitle>
                <div className="flex-1 min-w-4" />
                <Badge variant="outline" className={botActive ? "border-emerald-500 text-emerald-500 bg-emerald-500/10 text-[11px]" : "text-muted-foreground text-[11px]"}>
                  {botActive ? "Bot Active" : "Bot Idle"}
                </Badge>
              </div>
              <CardDescription className="text-xs pt-1">
                Send random bids to see orderbook updates and price charts change live.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4 grid gap-2">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleBotAction("step")} 
                  disabled={botLoading}
                  className="text-xs gap-1.5 h-8"
                >
                  <Zap className="size-3.5 text-amber-500" /> Send 5 Bids
                </Button>
                <Button 
                  type="button" 
                  variant={botActive ? "destructive" : "secondary"} 
                  size="sm" 
                  onClick={() => handleBotAction(botActive ? "stop" : "start")} 
                  disabled={botLoading}
                  className="text-xs h-8"
                >
                  {botActive ? "Pause Stream" : "Start Live Stream"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <CardHeader className="pt-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Trophy className="size-4 text-emerald-500" /> Market Settlement & Payout Demo
                </CardTitle>
                <div className="flex-1 min-w-4" />
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 text-[11px]">
                  Demo Mode
                </Badge>
              </div>
              <CardDescription className="text-xs pt-1">
                Simulate resolving Market #{marketId} to test ₹1.00/share winning payouts and instant balance settlement.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4 grid gap-3">
              {currentPos && (currentPos.sharesYes > 0 || currentPos.sharesNo > 0) ? (
                <div className="rounded-md border border-emerald-500/20 bg-background/60 p-2.5 text-xs grid gap-1">
                  <div className="font-medium text-foreground">Your Contract Holdings:</div>
                  <div className="flex items-center justify-between">
                    <span>YES Shares: <strong className="font-mono">{currentPos.sharesYes}</strong></span>
                    <span className="text-emerald-500 font-mono font-medium">Payout if YES: ₹{(currentPos.sharesYes * 1.00).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>NO Shares: <strong className="font-mono">{currentPos.sharesNo}</strong></span>
                    <span className="text-rose-500 font-mono font-medium">Payout if NO: ₹{(currentPos.sharesNo * 1.00).toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-md border border-dashed p-2.5 text-xs text-muted-foreground text-center">
                  Buy YES or NO shares above to test your settlement payout!
                </div>
              )}

              {resolveMessage && (
                <div className="rounded-md bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-500 font-medium">
                  {resolveMessage}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  type="button" 
                  size="sm" 
                  onClick={() => handleResolveMarket("YES")} 
                  disabled={resolveLoading}
                  className="text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Resolve YES (₹1.00/sh)
                </Button>
                <Button 
                  type="button" 
                  size="sm" 
                  onClick={() => handleResolveMarket("NO")} 
                  disabled={resolveLoading}
                  className="text-xs h-8 bg-rose-600 hover:bg-rose-700 text-white"
                >
                  Resolve NO (₹1.00/sh)
                </Button>
              </div>
            </CardContent>
          </Card>

          <LiveOrderBook marketId={marketId} onBookUpdate={handleBookUpdate} />
        </div>
      </div>
    </div>
  );
}
