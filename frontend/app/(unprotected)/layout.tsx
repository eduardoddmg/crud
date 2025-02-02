'use client';

import { Loading } from '@/components/loading';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token && !loading) router.push('/');
  }, [token, loading, router]);

  if (loading) return <Loading />;

  return <>{children}</>;
};

export default Layout;
