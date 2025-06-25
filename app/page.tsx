"use client"
import TradeCard from "@/components/custom/basicTradeCard"

export default function Dummy() {
  return (
    <div className="min-h-screen">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 ">
      {Array.from({ length: 10 }).map((_, i) => (
        <TradeCard key={i} src="" alt="" heading="" />
      ))}
    </div>
    </div>
  )
}