'use client';

import { Button } from './ui/button';
import Link from 'next/link';
import { Home, LogIn, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const Navbar = () => {

    return (
      <div className="w-full flex justify-between px-10 py-5">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Home />
          </Link>
        </div>
      </div>
    );
};
