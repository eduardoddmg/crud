'use client';

import { useAuth } from '@/context/auth-context';
import { Button } from './ui/button';
import Link from 'next/link';
import { Home, LogIn, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const Navbar = () => {
  const { token, logout, user } = useAuth();

  if (token)
    return (
      <div className="w-full flex justify-between px-10 py-5">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Home />
          </Link>
          <p>Olá, {user?.username}</p>
        </div>
        {token ? (
          <div className="flex gap-5">
            <Button onClick={() => logout()}>
              <LogOut />
            </Button>
            <Link href="/profile">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        ) : (
          <Link href="/login">
            <Button>
              <LogIn />
            </Button>
          </Link>
        )}
      </div>
    );
};
