"use client";

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface OrderRecord {
    orderId: string;
    userId: string;
    priceCents: number;
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

    useEffect(() => {
        // Fetch current initial order book state
        fetch(`http://localhost:4000/api/orders/orderbook/${marketId}`)
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    setBook(data);
                    if (onBookUpdate) onBookUpdate(data);
                }
            })
            .catch(err => console.error("Failed to load initial orderbook:", err));

        // Connect to the TradeOn Express Gateway
        const socket: Socket = io("http://localhost:4000", {
            withCredentials: true,
        });

        socket.on("connect", () => {
            setConnected(true);
            // Subscribe to the specific market ID room
            socket.emit("subscribe", marketId);
        });

        socket.on("disconnect", () => {
            setConnected(false);
        });

        socket.on("orderbook_update", (updatedBook: OrderBookData) => {
            setBook(updatedBook);
            if (onBookUpdate) onBookUpdate(updatedBook);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("orderbook_update");
            socket.close();
        };
    }, [marketId, onBookUpdate]);

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 w-full text-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <h3 className="text-xl font-bold font-serif text-white/90">Live Orderbook</h3>
                <span className={`flex items-center gap-2 text-xs font-medium uppercase tracking-wider ${connected ? 'text-green-400' : 'text-red-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                    {connected ? 'Live' : 'Disconnected'}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full">
                {/* === YES SIDE (BIDS) === */}
                <div>
                    <h4 className="text-blue-400 font-bold mb-2 pb-1 border-b border-blue-500/20">Buy YES</h4>
                    <div className="flex justify-between text-xs text-white/50 mb-1 px-1">
                        <span>Price (₹)</span>
                        <span>Qty</span>
                    </div>
                    <div className="space-y-1">
                        {book.yesOrders.length === 0 ? (
                            <div className="text-white/30 text-xs py-2 italic text-center">No open orders</div>
                        ) : (
                            book.yesOrders.map((o) => (
                                <div key={o.orderId} className="flex justify-between items-center bg-blue-500/5 hover:bg-blue-500/10 transition-colors px-2 py-1 rounded">
                                    <span className="text-blue-300 font-medium">₹{(o.priceCents / 100).toFixed(2)}</span>
                                    <span className="text-white/80">{o.quantity}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* === NO SIDE (ASKS) === */}
                <div>
                    <h4 className="text-red-400 font-bold mb-2 pb-1 border-b border-red-500/20">Buy NO</h4>
                    <div className="flex justify-between text-xs text-white/50 mb-1 px-1">
                        <span>Price (₹)</span>
                        <span>Qty</span>
                    </div>
                    <div className="space-y-1">
                        {book.noOrders.length === 0 ? (
                            <div className="text-white/30 text-xs py-2 italic text-center">No open orders</div>
                        ) : (
                            book.noOrders.map((o) => (
                                <div key={o.orderId} className="flex justify-between items-center bg-red-500/5 hover:bg-red-500/10 transition-colors px-2 py-1 rounded">
                                    <span className="text-red-300 font-medium">₹{(o.priceCents / 100).toFixed(2)}</span>
                                    <span className="text-white/80">{o.quantity}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
