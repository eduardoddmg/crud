'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { ItemList } from '@/modules/item/list';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token && !loading) router.push('/login');
  }, [token, loading]);

  return (
    <div className="py-5 space-y-5">
      <div className="space-y-5">
        <div className="space-x-5">
          <Link href="/item/adicionar">
            <Button variant="default">Adicionar</Button>
          </Link>
          <Link href="/item/adicionar/lote">
            <Button variant="default">Adicionar em lote</Button>
          </Link>
        </div>
        <ItemList />
      </div>
    </div>
  );
};

export default Page;
