"use client"
import { Avatar } from "@heroui/react"
import axios from "axios"
import { useState, useEffect } from "react"

export default function Profile() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await axios.get("/api/user_data");
        console.log(res)
        setBalance(res.data.user_data[0].balance); // assuming API returns { balance: ... }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    }

    fetchUserData();
  }, []);

  return (
    <>
      <span className="text-lg bg-amber-200">
        {balance !== null ? `Balance: ${balance}` : "Loading..."}
      </span>
    </>
  );
}
