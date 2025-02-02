'use client';

import { Loading } from '@/components/loading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProfileActions } from '@/modules/profile/actions';
import { ProfileForm } from '@/modules/profile/form';

const Page = () => {
  const { updateProfile, profile, loading } = useProfileActions();

  const onSubmit = (data) => {
    updateProfile(data);
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-5">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Dados pessoais</TabsTrigger>
          <TabsTrigger value="preference">Preferências</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileForm onSubmit={onSubmit} defaultValues={profile} />
        </TabsContent>
        <TabsContent value="preference">
          <p>Preferências</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
