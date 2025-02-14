"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { Home, LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";
import { ThemeToggle } from "./theme-provider";

export const Navbar = () => {
  return (
    <div className=" bg-primary-foreground">
      <div className="w-full flex justify-between px-4 py-2 items-center">
        <SidebarTrigger className="-ml-1" />
        <ThemeToggle />
      </div>
    </div>
  );
};
