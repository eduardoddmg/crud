'use client';

import { useItemActions } from '@/modules/item/actions';
import { ItemFormLote } from '@/modules/item/form-lote';
import { Item } from '@/modules/item/type';

const Page = () => {
  const { createBatchItem } = useItemActions();

  const onSubmit = (data: Item[]) => {
    createBatchItem(data);
  };
  return (
    <div className="space-y-5">
      <h2 className="text-xl">Adicionar em lote</h2>
      <ItemFormLote onSubmit={onSubmit} />;
    </div>
  );
};

export default Page;
