import { create } from "zustand";

const ENGINE_URL = process.env.NEXT_PUBLIC_ENGINE_URL || "http://localhost:4000";

export interface UserPosition {
  marketId: number;
  sharesYes: number;
  sharesNo: number;
  question?: string;
}

export interface UserOpenOrder {
  id: number;
  marketId: number;
  side: "YES" | "NO";
  price: number;
  quantity: number;
  filledQty: number;
  status: string;
  question: string;
  createdAt: string;
}

interface TradeState {
  balance: number | null;
  reservedBalance: number | null;
  positions: Record<number, UserPosition>;
  openOrders: UserOpenOrder[];
  isLoaded: boolean;
  isLoading: boolean;
  
  // Actions
  fetchPortfolio: (getToken: () => Promise<string | null>) => Promise<void>;
  fetchOrders: (getToken: () => Promise<string | null>) => Promise<void>;
  getPosition: (marketId: number) => UserPosition | undefined;
}

export const useTradeStore = create<TradeState>((set, get) => ({
  balance: null,
  reservedBalance: null,
  positions: {},
  openOrders: [],
  isLoaded: false,
  isLoading: false,

  fetchPortfolio: async (getToken) => {
    try {
      set({ isLoading: true });
      const token = await getToken();
      if (!token) return;

      const res = await fetch(`${ENGINE_URL}/api/users/me/portfolio`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        const posMap: Record<number, UserPosition> = {};
        if (Array.isArray(data.positions)) {
          data.positions.forEach((p: UserPosition) => {
            posMap[p.marketId] = p;
          });
        }

        set({
          balance: data.balance ?? 0,
          reservedBalance: data.reservedBalance ?? 0,
          positions: posMap,
          isLoaded: true,
        });
      }
    } catch (err) {
      console.error("[useTradeStore:fetchPortfolio]: Error fetching portfolio:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchOrders: async (getToken) => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await fetch(`${ENGINE_URL}/api/users/me/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const orders = await res.json();
        set({ openOrders: Array.isArray(orders) ? orders : [] });
      }
    } catch (err) {
      console.error("[useTradeStore:fetchOrders]: Error fetching orders:", err);
    }
  },

  getPosition: (marketId: number) => {
    return get().positions[marketId];
  },
}));
