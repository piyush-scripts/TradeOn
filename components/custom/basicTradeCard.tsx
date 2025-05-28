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
    
      <div className="flex-row bg-gray-300 rounded-md p-4 mb-6 mx-6 justify-center items-center">
        <div className="flex">
          <div>
            <Image
              className=" rounded-md mb-2"
              src="https://i.ibb.co/ycKVrm04/Chat-GPT-Image-May-24-2025-02-54-22-PM.png"
              alt="img"
              height={64}
              width={64}
            />
          </div>

          <div className="flex-col pl-3 ">
            <div className="font-bold font-sans">
              Punjab to win the match vs Mumbai?
            </div>
            <div className="text-sm text-gray-600">
              Match will start at 7:30
            </div>
          </div>
        </div>

        <div className="flex justify-around">
          <button className="border-green-700 bg-green-200 w-md h-8 mx-1 rounded-md">
            <div className="text-green-500 font-extrabold">YES</div>
          </button>
          <button className="border-red-700 bg-red-200 w-md h-8 mx-1 rounded-md">
            <div className="text-red-500 font-extrabold">NO</div>
          </button>
        </div>
      </div>
    
  );
}
