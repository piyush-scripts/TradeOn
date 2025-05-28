"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { redirect } from "next/navigation";

export type basicFormType = {
  heading: string;
  buttonText: string;
};

export default function BasicForm({ heading, buttonText }: basicFormType) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/signup", {
        name,
        password,
      });

      // If it's a 204 or 200 response
      if (res.status === 200 || res.status === 204 || res.status === 201) {
        setSuccess(true); // trigger success alert
        setName(""); // optional: reset form
        setPassword("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-10 space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">{heading}</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your username"
            value={name}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              value={password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center p-3">
          <Button type="submit" onClick={()=>{redirect("/signin")}} className="min-w-full">
            {buttonText}
          </Button>
        </div>
      </form>

      {success && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>User created successfully!</AlertTitle>
          <AlertDescription className="flex">
            You can now{" "}
            <a
              className=" text-black underline underline-offset-4"
              href="http://localhost:3000/signin"
            >
              {" "}
              login{" "}
            </a>
            .
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
