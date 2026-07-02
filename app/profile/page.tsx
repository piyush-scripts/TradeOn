"use client";

import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { ENGINE_URL } from "@/lib/config";
import { Mail, User as UserIcon, Calendar, DollarSign } from "lucide-react";

export default function ProfilePage() {
  const { isLoaded: authLoaded, isSignedIn, getToken } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const token = await getToken();
        const res = await fetch(`${ENGINE_URL}/api/users/me`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.balance === 'number') {
            setBalance(data.balance);
          }
        }
      } catch (err) {
        console.error("Error fetching balance:", err);
      } finally {
        setLoading(false);
      }
    }

    if (authLoaded && isSignedIn) {
      fetchBalance();
    } else if (authLoaded && !isSignedIn) {
      setLoading(false);
    }
  }, [authLoaded, isSignedIn, getToken]);

  if (loading || !userLoaded || !authLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Loading profile...</p>
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-900 border border-white/10 rounded-2xl p-8 text-center text-white">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
          <UserIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Access Profile</h2>
        <p className="text-slate-400 max-w-sm mb-6">Please sign in to view your profile settings and trade balance.</p>
      </div>
    );
  }

  const emailAddress = user.primaryEmailAddress?.emailAddress || "N/A";
  const fullName = user.fullName || user.username || "Trader";
  const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : "N/A";

  const displayBalance = balance !== null ? `₹${(balance / 100).toFixed(2)}` : "₹0.00";

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] pb-12 animate-in fade-in duration-500 text-white">
      <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative ambient background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-[80px] pointer-events-none" />

        {/* Profile Details */}
        <div className="flex flex-col items-center text-center relative z-10">
          {/* Avatar Image */}
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="Profile Avatar"
              className="w-24 h-24 rounded-full border-2 border-blue-500 shadow-md mb-6"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-6">
              <UserIcon className="w-12 h-12 text-slate-500" />
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-bold font-serif leading-tight mb-2">
            {fullName}
          </h1>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full mb-8">
            Verified Trader
          </span>

          {/* User Fields */}
          <div className="w-full space-y-4 text-left border-t border-white/5 pt-6">
            <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-4">
              <Mail className="w-5 h-5 text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Email Address</span>
                <span className="text-sm font-medium text-white/90">{emailAddress}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-4">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <div className="flex flex-col flex-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Available Balance</span>
                <span className="text-lg font-bold text-emerald-400">{displayBalance}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-4">
              <Calendar className="w-5 h-5 text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Member Since</span>
                <span className="text-sm font-medium text-white/90">{memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
