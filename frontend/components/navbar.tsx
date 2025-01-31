'use client';

import { useAuth } from '@/context/auth-context';
import { Button } from './ui/button';
import Link from 'next/link';
import { LogIn, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const Navbar = () => {
  const { token, logout, user } = useAuth();

  if (token)
    return (
      <div className="w-full flex justify-between px-10 py-5">
        <p>Olá, {user?.username}</p>
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
