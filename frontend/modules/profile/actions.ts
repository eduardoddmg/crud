import { useAuth } from '@/context/auth-context';
import { toast } from '@/hooks/use-toast';
import { api } from '@/utils/request';
import { useFetch } from '@/hooks/use-fetch';

export const useProfileActions = () => {
  const {
    fetchData: getProfile,
    data: profile,
    loading,
  } = useFetch('/profile');
  const { token } = useAuth();

  const updateProfile = (data: { name: string; description: string }) => {
    return api
      .put(
        `/profile`,
        { profile: data },
        {
          headers: { authorization: `Bearer: ${token}` },
        }
      )
      .then(() => {
        const message = 'Perfil atualizado com sucesso!';
        toast({
          title: 'Sucesso!',
          description: message,
          className: 'text-white bg-green-500',
        });
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

  return {
    getProfile,
    updateProfile,
    profile,
    loading,
  };
};
