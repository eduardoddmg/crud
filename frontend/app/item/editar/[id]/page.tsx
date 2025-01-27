'use client';

import * as React from 'react';

import { useAuth } from '@/context/auth-context';
import { useParams } from 'next/navigation';
import { Loading } from '@/components/loading';
import { ItemForm } from '@/modules/item/form';
import { useItemActions } from '@/modules/item/actions';

const Page = () => {
  const { getItemById, updateItem } = useItemActions();
  const { id } = useParams() as { id: string };

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const { token } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    const response = await getItemById(id);
    setData(response);
    setLoading(false);
  };

  React.useEffect(() => {
    if (token) fetchData();
  }, [token]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    updateItem(id, data);
  };

  if (loading) return <Loading />;

  return <ItemForm onSubmit={onSubmit} defaultValues={data} />;
};

export default Page;
