"use client";

import { useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { useTradeStore } from "@/lib/store/useTradeStore";

export function useUserPortfolio() {
  const { isSignedIn, isLoaded: authLoaded, getToken } = useAuth();
  const {
    balance,
    reservedBalance,
    positions,
    openOrders,
    isLoaded,
    isLoading,
    fetchPortfolio,
    fetchOrders,
    getPosition,
  } = useTradeStore();

  const refetch = useCallback(async () => {
    if (authLoaded && isSignedIn) {
      await Promise.all([
        fetchPortfolio(getToken),
        fetchOrders(getToken),
      ]);
    }
  }, [authLoaded, isSignedIn, getToken, fetchPortfolio, fetchOrders]);

  useEffect(() => {
    refetch();

    const handleUpdate = () => {
      refetch();
    };

    window.addEventListener("balance-update", handleUpdate);
    window.addEventListener("position-update", handleUpdate);

    return () => {
      window.removeEventListener("balance-update", handleUpdate);
      window.removeEventListener("position-update", handleUpdate);
    };
  }, [refetch]);

  return {
    balance,
    reservedBalance,
    positions,
    openOrders,
    isLoaded,
    isLoading,
    getPosition,
    refetch,
  };
}
