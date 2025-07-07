"use client";
import TradeCard from "@/components/custom/basicTradeCard";

import { eventsDataWithItems } from "@/constants/constants";

export default function Home() {
  return (
    <div className=" min-h-screen ">
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4  ">
        {eventsDataWithItems.map((data, i) => (
          <TradeCard
            key={data.id}
            src={data.imageUri}
            heading={data.heading}
            text={data.text}
            itemId={data.itemId}
          />
        ))}
      </div>
    </div>
  );
}
