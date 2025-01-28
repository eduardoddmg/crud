import { useAuth } from '@/context/auth-context';
import { toast } from '@/hooks/use-toast';
import { api } from '@/utils/request';
import { useRouter } from 'next/navigation';
import { Item } from './type';
import { useFetch } from '@/hooks/use-fetch';

export const useItemActions = () => {
  const { fetchData: getAllItems, data, loading } = useFetch('/item');
  const { token } = useAuth();
  const router = useRouter();

  const searchItem = (q: string) => {
    getAllItems(q);
  };

  const createItem = (name: string, description: string) => {
    return api
      .post(
        '/item',
        { name, description },
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then(() => {
        const message = 'Item criado com sucesso!';
        toast({
          title: 'Sucesso!',
          description: message,
          className: 'text-white bg-green-500',
        });
        router.push('/');
      })
      .catch((error) => {
        const message = error.response.data.message;
        toast({
          title: 'Aconteceu algo de errado',
          description: message,
          className: 'text-white bg-red-500',
        });
      });
  };

  const createBatchItem = (data: Item[]) => {
    return api
      .post('/item/batch', data, {
        headers: { authorization: `Bearer: ${token}` },
      })
      .then(() => {
        const message = 'Lote de items criado com sucesso!';
        toast({
          title: 'Sucesso!',
          description: message,
          className: 'text-white bg-green-500',
        });
        router.push('/');
      })
      .catch((error) => {
        const message = error.response.data.message;
        toast({
          title: 'Aconteceu algo de errado',
          description: message,
          className: 'text-white bg-red-500',
        });
      });
  };

  const getItemById = async (id: string) => {
    const response = await api.get(`/item/${id}`, {
      headers: {
        authorization: `Bearer: ${token}`,
      },
    });
    return response.data;
  };

  const updateItem = (
    id: string,
    data: { name: string; description: string }
  ) => {
    return api
      .put(`/item/${id}`, data, {
        headers: { authorization: `Bearer: ${token}` },
      })
      .then(() => {
        const message = 'Item atualizado com sucesso!';
        toast({
          title: 'Sucesso!',
          description: message,
          className: 'text-white bg-green-500',
        });
        router.push('/');
      })
      .catch((error) => {
        const message = error.response.data.message;
        toast({
          title: 'Aconteceu algo de errado',
          description: message,
          className: 'text-white bg-red-500',
        });
      });
  };

  const removeItem = async (id: string) => {
    return api
      .delete(`/item/${id}`, {
        headers: { authorization: `Bearer: ${token}` },
      })
      .then(() => {
        toast({
          title: 'Sucesso!',
          description: 'Item removido com sucesso',
          className: 'text-white bg-green-500',
        });
        getAllItems();
      });
  };

  return {
    createItem,
    createBatchItem,
    getAllItems,
    searchItem,
    getItemById,
    updateItem,
    removeItem,
    data,
    loading,
  };
};
