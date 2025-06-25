"use client";
import Image from "next/image";

interface TradeCardProps {
  src: string;
  alt: string;
  heading: string;
  text?: string;
}

export default function TradeCard({ src, alt, heading, text }: TradeCardProps) {
  return (
    <div className="flex-row bg-gray-300 rounded-md p-4 justify-center items-center">
      <div className="flex gap-4">
          <Image
            className="rounded-md "
            src="https://i.ibb.co/zVQmr6FR/test.png"
            alt="img"
            height={64}
            width={64}
          />
        <div className="font-bold font-sans">
          Punjab to win the match vs Mumbai?
        </div>
      </div>

      <div className="flex justify-around mt-3">
        <button className="border border-green-700 bg-green-200 w-md h-8 mx-1 rounded-md">
          <div className="text-green-500 font-extrabold">YES</div>
        </button>
        <button className="border border-red-700 bg-red-200 w-md h-8 mx-1 rounded-md">
          <div className="text-red-500 font-extrabold">NO</div>
        </button>
      </div>
    </div>
  );
}
