"use client";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { House } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { SquareUserRound } from "lucide-react";
import { Wallet } from "lucide-react";
import { LogIn } from "lucide-react";
import { LogOut } from "lucide-react";
import { IconButton } from "@/components/customUI/basicButton";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useAuthStore } from "@/states/zustand";
import axios from "axios";

export default function Navbar() {
  const { isLoggedIn, login, logout } = useAuthStore();
  const router = useRouter();

  const handleClick = async () => {
    try {
      const res = await axios.post("/api/logout");
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav>
          <div className="flex h-16 justify-around items-center p-2">
            <IconButton
              label="Home"
              icon={<House size={38} strokeWidth={1} />}
              onClick={() => router.push("/")}
            />
            <IconButton
              label="Trades"
              icon={<BriefcaseBusiness size={38} strokeWidth={1} />}
              onClick={() => router.push("/trades")}
            />
            <IconButton
              label="Funds"
              icon={<Wallet size={38} strokeWidth={1} />}
              onClick={() => router.push("/funds")}
            />
            <IconButton
              label="Profile"
              icon={<SquareUserRound size={38} strokeWidth={1} />}
              onClick={() => router.push("/profile")}
            />

            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </nav>
      </motion.div>
    </>
  );
}
