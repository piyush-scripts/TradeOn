"use client";

import { House } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { SquareUserRound } from "lucide-react";
import { Wallet } from "lucide-react";
import { LogIn } from "lucide-react";
import { LogOut } from "lucide-react";
import { IconButton } from "@/components/customUI/basicButton";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useAuthStore } from "../../states/zustand";
import axios from "axios";

export default function Navbar() {
  
  const { isLoggedIn , login , logout } = useAuthStore();
  const router = useRouter();

const handleClick = async () => {
  try {
    const res = await axios.post('/api/logout');
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav>
          <div className="flex justify-around items-center p-2">
            <IconButton
              label = "Home"
              icon={<House size={38} strokeWidth={1}   />}
              onClick={() => router.push("/")}
            />
            <IconButton
              label = "Trades"
              icon={<BriefcaseBusiness size={38} strokeWidth={1}  />}
              onClick={() => alert("house")}
            />
            <IconButton
              label = "Funds"
              icon={<Wallet size={38} strokeWidth={1}  />}
              onClick={() => alert("house")}
            />
            <IconButton
              label = "Profile"
              icon={<SquareUserRound size={38} strokeWidth={1}  />}
              onClick={() => router.push("/profile")}
            />

            {isLoggedIn ? (
              <IconButton
              label = "Logout"  
              icon={<LogOut size={38} strokeWidth={1}  />}
                onClick={async () => {
                  await handleClick()
                  await router.push("/signin")
                  logout()}
                }
              />
            ) : (
              <IconButton
              label = "Login"  
              icon={<LogIn size={38} strokeWidth={1}  />}
              onClick={() => {
                router.push("/signin")
                }}
              />
            )}
          </div>
        </nav>
      </motion.div>
    </>
  );
}
