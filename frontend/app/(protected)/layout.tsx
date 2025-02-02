'use client';

import { Loading } from '@/components/loading';
import { Navbar } from '@/components/navbar';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token && !loading) router.push('/login');
  }, [token, loading, router]);

  if (loading) return <Loading />;

  return (
    <div>
      <Navbar />
      <div className="px-10">{children}</div>
    </div>
  );
};

export default Layout;
