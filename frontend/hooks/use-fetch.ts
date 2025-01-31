/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import { api } from '@/utils/request';
import { useAuth } from '@/context/auth-context';

export const useFetch = (route: string) => {
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[] | null>(null);

  const fetchData = useCallback(
    async (q = '') => {
      setLoading(true);
      try {
        const response = await api.get(route + `?q=${q}`, {
          headers: { authorization: `Bearer: ${token}` },
        });
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    },
    [route, token] // Memoriza a função baseada em `route` e `token`
  );

  useEffect(() => {
    if (token) fetchData();
  }, [token, fetchData]); // Inclui `fetchData` nas dependências

  return {
    data,
    loading,
    fetchData,
  };
};
