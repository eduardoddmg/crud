'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/request';
import { toast } from '@/hooks/use-toast';
import { Loading } from '@/components/loading';

interface AuthContextData {
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: UserType | null;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface UserType {
  id: string;
  username: string;
  email: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    api
      .post('/auth/login', { email, password })
      .then((response) => {
        const message = response.data.message;
        setToken(response.data.data.token);
        toast({
          title: 'Sucesso!',
          description: message,
          className: 'text-white bg-green-500',
        });
        router.push('/'); // Redirecionar após login
      })
      .catch((error) => {
        const message = error.response.data.message;
        toast({
          title: 'Aconteceu algo de errado',
          description: message,
          className: 'text-white bg-red-500',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Logout
  const logout = () => {
    router.push('/login');
    setToken(null);
  };

  // Get Profile
  const getProfile = (token: string) => {
    api
      .get('/auth', { headers: { authorization: `Bearer: ${token}` } })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => logout());
  };

  // Verificar usuário ao carregar a página
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
      getProfile(JSON.parse(storedToken));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, loading, login, logout, user }}>
      {loading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
