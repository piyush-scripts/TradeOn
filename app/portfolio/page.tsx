"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Briefcase, Clock, CreditCard, PieChart, User } from "lucide-react";
import { ENGINE_URL } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserPortfolio } from "@/hooks/useUserPortfolio";

export default function PortfolioPage() {
  const { isSignedIn, getToken } = useAuth();
  const { balance, reservedBalance, positions, openOrders, isLoading } = useUserPortfolio();
  const [cancelingId, setCancelingId] = useState<number | string | null>(null);

  if (isLoading && balance === null) {
    return (
      <div className="grid gap-6 pb-8">
        <div className="space-y-2">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-5 w-64" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="flex items-start justify-between gap-4 p-5">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-28" />
                </div>
                <Skeleton className="size-5 rounded-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4 mt-4">
          <div className="border-b pb-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-1" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) return <CenteredState title="Access portfolio" description="Please sign in to view holdings, active positions, and open orders." />;

  const availableCash = (balance || 0) / 100;
  const reservedCash = (reservedBalance || 0) / 100;
  const totalValue = availableCash + reservedCash;

  const positionList = Object.values(positions);
  const activePositions = positionList.filter((p) => p.sharesYes > 0 || p.sharesNo > 0);

  const handleCancelOrder = async (marketId: number, orderId: number | string) => {
    setCancelingId(orderId);
    try {
      const token = await getToken();
      const res = await fetch(`${ENGINE_URL}/api/orders/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ marketId, orderId }),
      });
      if (res.ok) {
        window.dispatchEvent(new Event("balance-update"));
      }
    } catch (e) {
      console.error("Failed to cancel order:", e);
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div className="grid gap-6 pb-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Portfolio</h1>
        <p className="text-muted-foreground">Balances, positions, and open limit orders.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={<Briefcase />} label="Total value" value={`₹${totalValue.toFixed(2)}`} />
        <StatCard icon={<CreditCard />} label="Available cash" value={`₹${availableCash.toFixed(2)}`} />
        <StatCard icon={<PieChart />} label="Reserved" value={`₹${reservedCash.toFixed(2)}`} />
      </div>

      <div className="space-y-3">
        <div className="border-b pb-2">
          <h2 className="text-xl font-semibold tracking-tight">Active Positions</h2>
          <p className="text-sm text-muted-foreground">Shares currently held by outcome.</p>
        </div>
        <div>
          {activePositions.length === 0 ? (
            <EmptyState text="You do not own any contract shares right now." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Market</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead className="text-right">Shares</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activePositions.map((pos) => {
                  const side = pos.sharesYes > 0 ? "YES" : "NO";
                  const count = pos.sharesYes > 0 ? pos.sharesYes : pos.sharesNo;
                  return (
                    <TableRow key={pos.marketId}>
                      <TableCell className="font-medium">{pos.question || `Market #${pos.marketId}`}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={side === "YES" ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10" : "border-rose-500/30 text-rose-500 bg-rose-500/10"}
                        >
                          {side}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold">{count}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="border-b pb-2">
          <h2 className="text-xl font-semibold tracking-tight">Open Orders</h2>
          <p className="text-sm text-muted-foreground">Unfilled or partially filled limit orders. Cancel to release reserved funds.</p>
        </div>
        <div>
          {openOrders.length === 0 ? (
            <EmptyState text="You have no open orders right now." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Market</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Filled</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.question}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={order.side === "YES" ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10" : "border-rose-500/30 text-rose-500 bg-rose-500/10"}
                      >
                        {order.side}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">₹{(order.price / 100).toFixed(2)}</TableCell>
                    <TableCell className="text-right font-mono">{order.quantity}</TableCell>
                    <TableCell className="text-right font-mono">{order.filledQty}</TableCell>
                    <TableCell><Badge variant="secondary">{order.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-destructive hover:bg-destructive/10"
                        onClick={() => handleCancelOrder(order.marketId, order.id)}
                        disabled={cancelingId === order.id}
                      >
                        {cancelingId === order.id ? "Canceling..." : "Cancel"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="text-2xl font-semibold tabular-nums">{value}</div>
        </div>
        <span className="text-muted-foreground [&_svg]:size-5">{icon}</span>
      </CardContent>
    </Card>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="flex min-h-28 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">{text}</div>;
}

function CenteredState({ title, description }: { title: string; description?: string }) {
  return (
    <Card className="mx-auto mt-10 max-w-md">
      <CardContent className="flex min-h-[260px] flex-col items-center justify-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-full border bg-muted">
          {title.includes("Loading") ? <Clock className="size-6 text-muted-foreground" /> : <User className="size-6 text-muted-foreground" />}
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{title}</h2>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
