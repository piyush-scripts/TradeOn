"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { ShimmerButton } from "../magicui/shimmer-button";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

  return (
    <Navbar className="flex h-16">
      <NavbarBrand>
        <img
          src="https://i.ibb.co/C3K5vXW8/C94-EA7-C1-7-AE6-4375-B5-A3-AF4680-AEC1-C8.jpg"
          width={128}
          alt="logo"
        />
      </NavbarBrand>

      <NavbarContent className="ml-auto hidden sm:flex gap-4">
        <NavbarItem>
          <Link className="cursor-pointer" color="foreground" onClick={()=>{router.push("/funds")}}>
            Portfolio
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link className="cursor-pointer" aria-current="page" onClick={()=>{router.push("/funds")}}>
            Pending
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="cursor-pointer" color="foreground" onClick={()=>{router.push("/funds")}}>
            Balance
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ShimmerButton onClick={()=>{router.push("/funds")}} className="h-10 font-roboto font-bold">
            Add ₹
          </ShimmerButton>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
