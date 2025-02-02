'use client';

import { Button } from '@/components/ui/button';
import { ItemList } from '@/modules/item/list';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="py-5 space-y-5">
      <div className="space-y-5">
        <div className="space-x-5">
          <Link href="/item/adicionar">
            <Button variant="default">Adicionar</Button>
          </Link>
        </div>
        <ItemList />
      </div>
    </div>
  );
};

export default Page;
