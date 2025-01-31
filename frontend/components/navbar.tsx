'use client';

import { useAuth } from '@/context/auth-context';
import { Button } from './ui/button';
import Link from 'next/link';
import { LogIn, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { token, logout, user } = useAuth();
  
  if (token) return (
    <div className="w-full flex justify-between px-10 py-5">
      <p>Olá, {user?.username}</p>
      {token ? (
        <Button onClick={() => logout()}>
          <LogOut />
        </Button>
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
