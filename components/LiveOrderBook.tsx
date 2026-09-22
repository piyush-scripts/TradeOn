"use client";

import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { ENGINE_URL } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardToolbar } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface OrderRecord {
  orderId: string;
  userId: string;
  price: number;
  quantity: number;
  timestamp: number;
}

interface OrderBookData {
  yesOrders: OrderRecord[];
  noOrders: OrderRecord[];
}

export function LiveOrderBook({ marketId, onBookUpdate }: { marketId: number; onBookUpdate?: (book: OrderBookData) => void }) {
  const [book, setBook] = useState<OrderBookData>({ yesOrders: [], noOrders: [] });
  const [connected, setConnected] = useState(false);
  const onBookUpdateRef = useRef(onBookUpdate);

  useEffect(() => {
    onBookUpdateRef.current = onBookUpdate;
  }, [onBookUpdate]);

  useEffect(() => {
    fetch(`${ENGINE_URL}/api/orders/orderbook/${marketId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setBook(data);
          onBookUpdateRef.current?.(data);
        }
      })
      .catch((err) => console.error("Failed to load initial orderbook:", err));

    const socket: Socket = io(ENGINE_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("subscribe", marketId);
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("orderbook_update", (updatedBook: OrderBookData) => {
      setBook(updatedBook);
      onBookUpdateRef.current?.(updatedBook);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("orderbook_update");
      socket.close();
    };
  }, [marketId]);

  const topYes = book.yesOrders[0]?.price;
  const topNo = book.noOrders[0]?.price;
  const spreadPaise = topYes && topNo ? Math.max(0, 100 - (topYes + topNo)) : null;

  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardHeader className="py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              Order Book Depth
            </CardTitle>
            <CardDescription className="text-xs">
              Live resting bids streaming from the matching engine.
            </CardDescription>
          </div>
          <CardToolbar className="flex items-center gap-2">
            {spreadPaise !== null && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                Spread: {spreadPaise}¢
              </span>
            )}
            <Badge 
              variant="outline" 
              className={connected ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10" : "border-destructive/30 text-destructive bg-destructive/10"}
            >
              {connected ? "🟢 Live" : "Offline"}
            </Badge>
          </CardToolbar>
        </div>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
        <OrderBookSide 
          type="YES" 
          orders={book.yesOrders} 
        />
        <OrderBookSide 
          type="NO" 
          orders={book.noOrders} 
        />
      </CardContent>
    </Card>
  );
}

function OrderBookSide({ type, orders }: { type: "YES" | "NO"; orders: OrderRecord[] }) {
  const isYes = type === "YES";
  const maxQty = Math.max(...orders.map((o) => o.quantity), 1);
  const displayOrders = orders.slice(0, 8);

  return (
    <div className="flex flex-col">
      <div className={`px-4 py-2 text-xs font-semibold flex items-center justify-between border-b ${
        isYes ? "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/5 text-rose-600 dark:text-rose-400"
      }`}>
        <span>{type} Bids ({orders.length})</span>
        <span className="font-mono text-[11px] font-normal text-muted-foreground">
          Top: {orders[0] ? `₹${(orders[0].price / 100).toFixed(2)}` : "—"}
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full text-xs">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b text-[11px] text-muted-foreground">
              <TableHead className="h-8 pl-4">PRICE</TableHead>
              <TableHead className="h-8 text-right">SHARES</TableHead>
              <TableHead className="h-8 text-right pr-4">TOTAL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayOrders.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={3} className="h-20 text-center text-muted-foreground text-xs font-normal">
                  No open {type} bids
                </TableCell>
              </TableRow>
            ) : (
              displayOrders.map((order) => {
                const totalRupees = ((order.price * order.quantity) / 100).toFixed(2);
                const depthPercent = Math.min(100, Math.max(5, (order.quantity / maxQty) * 100));

                return (
                  <TableRow key={order.orderId} className="relative hover:bg-muted/40 transition-colors group">
                    <TableCell className="pl-4 py-1.5 font-mono font-semibold relative z-10">
                      <div 
                        className={`absolute inset-y-0 left-0 -z-10 transition-all ${
                          isYes ? "bg-emerald-500/15" : "bg-rose-500/15"
                        }`} 
                        style={{ width: `${depthPercent}%` }}
                      />
                      <span className={isYes ? "text-emerald-500" : "text-rose-500"}>
                        ₹{(order.price / 100).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-1.5 font-mono relative z-10 text-muted-foreground group-hover:text-foreground">
                      {order.quantity}
                    </TableCell>
                    <TableCell className="text-right pr-4 py-1.5 font-mono relative z-10 text-muted-foreground">
                      ₹{totalRupees}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
