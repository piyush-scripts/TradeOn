"use client"
import TradeCard from "@/components/custom/basicTradeCard"

export default function Dummy() {
  return (
    <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
      {Array.from({ length: 18 }).map((_, i) => (
        <TradeCard key={i} src="" alt="" heading="" />
      ))}
    </div>
  )
}