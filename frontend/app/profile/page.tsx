'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/auth-context';
import { ProfileForm } from '@/modules/profile/form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token && !loading) router.push('/login');
  }, [token, loading]);

  const onSubmit = (data) => console.log(data);
  return (
    <div className="space-y-5">
      <h1>Perfil</h1>
      <Tabs defaultValue="dados-pessoais">
        <TabsList>
          <TabsTrigger value="dados-pessoais">Dados pessoais</TabsTrigger>
        </TabsList>
        <TabsContent value="dados-pessoais">
          <ProfileForm onSubmit={onSubmit} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
