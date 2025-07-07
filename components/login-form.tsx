"use client"
import {useAuthStore} from "@/states/zustand";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import handleSignin from "@/actions/auth/signin";
import { redirect, useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
  const router = useRouter();
  const { isLoggedIn, login ,logout } = useAuthStore();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={handleSignin} >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Trade On account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  name="name"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button type="submit" onClick={()=>{login(); redirect("/")}} className="w-full ">
                Login
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                
              </div>

              <div className="text-center ">
                Don&apos;t have an account?{" "}
                <span
                  onClick={()=>{redirect("/signup")}}
                  className="underline underline-offset-4 hover:text-muted-foreground "
                >
                  Sign up
                </span>
              </div>
            </div>
          </form>
          <div className="bg-white relative hidden md:block">
            <img
              src="https://i.ibb.co/ycKVrm04/Chat-GPT-Image-May-24-2025-02-54-22-PM.png"
              alt="Image"
              className="absolute -inset-2 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale "
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}