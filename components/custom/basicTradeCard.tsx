"use client";
import React, { useState } from "react";

import { Slider } from "../ui/slider";
import axios from "axios";
import { motion } from "motion/react";


interface TradeCardProps {
  itemId: number;
  src: string;
  heading: string;
  text?: string;
}

export default function TradeCard({
  itemId,
  src,
  heading,
  text,
}: TradeCardProps) {
  const [slideBar, setSlideBar] = useState(false);
  const [selected, setSelected] = useState<"YES" | "NO" | null>(null);
  const [side, setSide] = useState<"ask" | "bid" | null>(null);
  const [quantity, setQuantity] = useState([1]);
  const [currentPrice, setCurrentPrice] = useState(50);
  const [quantities, setQuantities] = useState(176);
  const [price, setPrice] = useState([currentPrice]);

  //fetch Price handler

  const fetchPrice = async (itemId: number, side: "ask" | "bid" | null) => {
    try {
      const response = await axios.get("/api/price", {
        params: {
          itemId: itemId,
          side: side,
        },
      });
      const price = response.data.price;
      const available = response.data.quantity;
      setCurrentPrice(price);
      setQuantities(available);
      console.log(price);
    } catch (error) {
      console.error(error);
    }
  };
  // place order handler
  const placeOrderHandler = async (
    price: number,
    quantity: number,
    itemId: number
  ) => {
    try {
      axios.post("/api/placeOrder", {
        data: {
          price: price,
          quantity: quantity,
          itemId: itemId,
          side: side,
        },
      });
      console.log("Order Place!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-md p-3 justify-center items-center h-32 hover:bg-white hover:scale-103 transition-all duration-100">
      {!slideBar ? (
        <>
          <div className="flex gap-x-4">
            <img
              className="flex rounded-md  "
              src={src}
              alt="img"
              height={64}
              width={64}
            />
            <div className="flex flex-col">
              <label className=" h-12 overflow-auto font-medium text-shadow-gray-800">
                {heading}
              </label>
            </div>
          </div>
          <div className="flex justify-around mt-3">
            <button
              className="h-8 flex items-center justify-center text-sm font-normal bg-green-600 tracking-wide w-32 rounded-full text-primary-foreground dark:text-secondary-foreground px-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12]"
              onClick={async () => {
                const newSide = "bid";
                setSide(newSide);
                setSlideBar(true);
                setSelected("YES");
                await fetchPrice(itemId, newSide);
              }}
            >
              <div className=" font-extrabold">Buy Yes</div>
            </button>
            <button
              className="h-8 flex items-center justify-center text-sm font-normal bg-red-700 tracking-wide w-32 rounded-full text-primary-foreground dark:text-secondary-foreground px-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12]"
              onClick={async () => {
                const newSide = "ask";
                setSide(newSide);
                setSlideBar(true);
                setSelected("NO");
                await fetchPrice(itemId, newSide);
              }}
            >
              <div className=" font-extrabold"> Buy No</div>
            </button>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col ">
            <div className="flex flex-row justify-around ">
              <label className="flex flex-row  text-xs font-medium text-gray-700 px-2 bg-stone-100 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12] rounded-md">
                Selected:
                <span
                  className={`font-bold ml-1 ${
                    selected === "YES" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {selected}
                </span>
              </label>
              <label className="text-xs font-medium text-gray-700 px-2 bg-stone-100 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12] rounded-md">
                Current: ₹{currentPrice}
              </label>
              <label className="text-xs font-medium text-gray-700 px-2 bg-stone-100 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12] rounded-md">
                Avl: {quantities}
              </label>
            </div>
            <div className="text-xs ml-0.5 mb-0.5">Buy at : ₹{price[0]}</div>
            <Slider
              value={price}
              onValueChange={setPrice}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="text-xs ml-0.5 mb-0.5">Qty:{quantity}</div>
            <Slider
              value={quantity}
              onValueChange={setQuantity}
              max={10}
              step={1}
              className="w-full mb-2"
            />

            <div className="flex flex-row justify-around">
              <button
                className="h-8 flex items-center justify-center text-sm font-normal bg-green-600 tracking-wide w-32 rounded-full text-primary-foreground dark:text-secondary-foreground px-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12]"
                onClick={async () => {
                  await placeOrderHandler(price[0], quantity[0], itemId);
                  setSlideBar(!slideBar);
                }}
              >
                <div className="font-extrabold">Confirm</div>
              </button>
              <button
                className="h-8 flex items-center justify-center text-sm font-normal bg-red-700 tracking-wide w-32 rounded-full text-primary-foreground dark:text-secondary-foreground px-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12]"
                onClick={async () => {
                  setSlideBar(!slideBar);
                }}
              >
                <div className=" font-extrabold">Cancel</div>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
