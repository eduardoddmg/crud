'use client';

import { useItemActions } from '@/modules/item/actions';
import { ItemForm } from '@/modules/item/form';

const Page = () => {
  const { createItem } = useItemActions();

  const onSubmit = (data: { name: string; description: string }) => {
    const { name, description } = data;
    createItem(name, description);
  };
  return (
    <div className="p-10 space-y-5">
      <h2 className="text-xl">Adicionar</h2>
      <ItemForm onSubmit={onSubmit} />;
    </div>
  );
};

export default Page;
