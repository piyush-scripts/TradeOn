"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Calendar, Mail, User as UserIcon, Wallet } from "lucide-react";
import { ENGINE_URL } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.balance === "number") setBalance(data.balance);
        }
      } catch (err) {
        console.error("Error fetching balance:", err);
      } finally {
        setLoading(false);
      }
    }

    if (authLoaded && isSignedIn) fetchBalance();
    else if (authLoaded && !isSignedIn) setLoading(false);
  }, [authLoaded, isSignedIn, getToken]);

  if (loading || !userLoaded || !authLoaded) {
    return (
      <div className="mx-auto grid max-w-xl gap-6 pb-8">
        <Card>
          <CardHeader className="items-center text-center">
            <Skeleton className="size-24 rounded-full" />
            <div className="space-y-2 mt-2 flex flex-col items-center">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-5 w-24" />
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return <CenteredState title="Access profile" description="Please sign in to view your profile settings and trade balance." />;
  }

  const emailAddress = user.primaryEmailAddress?.emailAddress || "N/A";
  const fullName = user.fullName || user.username || "Trader";
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    : "N/A";
  const displayBalance = balance !== null ? `₹${(balance / 100).toFixed(2)}` : "₹0.00";

  return (
    <div className="mx-auto grid max-w-xl gap-6 pb-8">
      <Card>
        <CardHeader className="items-center text-center">
          {user.imageUrl ? (
            <Image src={user.imageUrl} alt="Profile avatar" width={96} height={96} className="rounded-full border" />
          ) : (
            <div className="flex size-24 items-center justify-center rounded-full border bg-muted">
              <UserIcon className="size-10 text-muted-foreground" />
            </div>
          )}
          <div className="space-y-2">
            <CardTitle className="text-2xl">{fullName}</CardTitle>
            <Badge variant="outline" appearance="outline">Verified trader</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3">
          <ProfileRow icon={<Mail />} label="Email address" value={emailAddress} />
          <ProfileRow icon={<Wallet />} label="Available balance" value={displayBalance} />
          <ProfileRow icon={<Calendar />} label="Member since" value={memberSince} />
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md border p-3">
      <span className="text-muted-foreground [&_svg]:size-4">{icon}</span>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function CenteredState({ title, description }: { title: string; description?: string }) {
  return (
    <Card className="mx-auto mt-10 max-w-md">
      <CardContent className="flex min-h-[260px] flex-col items-center justify-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-full border bg-muted">
          <UserIcon className="size-6 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{title}</h2>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
